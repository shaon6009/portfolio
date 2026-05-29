import { google } from 'googleapis';
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const title = formData.get('title');
    const description = formData.get('description');
    const category = formData.get('category');
    const githubLink = formData.get('github_link') || '';
    const techInput = formData.get('technologies') || '';

    if (!file || !title) {
      return NextResponse.json({ success: false, error: 'Missing core validation tokens.' }, { status: 400 });
    }

    // Process technologies array safely split out from form text tokens
    const technologies = techInput.split(',').map(t => t.trim()).filter(Boolean);
    const mediaType = file.type.includes('video') ? 'video' : 'image';

    // 1. Authenticate with Google Drive via Service Account Array Context
    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/drive.file'],
    });
    const drive = google.drive({ version: 'v3', auth });

    // 2. Stream Binary File Buffers straight into designated folder
    const buffer = Buffer.from(await file.arrayBuffer());
    const driveResponse = await drive.files.create({
      requestBody: {
        name: `${Date.now()}_${file.name}`,
        parents: [process.env.GOOGLE_DRIVE_FOLDER_ID],
      },
      media: {
        mimeType: file.type,
        body: require('stream').Readable.from(buffer),
      },
      fields: 'id, webContentLink',
    });

    const fileId = driveResponse.data.id;

    // Adjust access scopes dynamically so public users can pull visual streams
    await drive.permissions.create({
      fileId: fileId,
      requestBody: { role: 'reader', type: 'anyone' },
    });

    // Format your clean raw media download string asset pointer directly out from Google APIs
    const staticMediaUrl = driveResponse.data.webContentLink.replace('&export=download', '');

    // 3. Inject fully assembled document into Supabase tables directly
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
    const { data, error } = await supabase
      .from('projects')
      .insert([
        {
          title,
          description,
          category,
          technologies,
          media_url: staticMediaUrl,
          media_type: mediaType,
          github_link: githubLink
        }
      ])
      .select();

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("Pipeline failure routing asset execution:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}