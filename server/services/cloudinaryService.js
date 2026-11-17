import crypto from 'crypto';

// Cloudinary Upload Helper (Backend only)
export const uploadToCloudinary = async (fileBufferOrBase64, folder = 'geet_studio') => {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      'Cloudinary credentials (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET) are not configured on the server.'
    );
  }

  try {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const formData = new URLSearchParams();
    formData.append('file', fileBufferOrBase64);
    formData.append('timestamp', String(timestamp));
    formData.append('folder', folder);
    formData.append('api_key', apiKey);

    // Compute cryptographic signature: sort params alphabetically, append secret, hash with SHA-1
    const stringToSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
    const signature = crypto.createHash('sha1').update(stringToSign).digest('hex');
    formData.append('signature', signature);

    if (process.env.CLOUDINARY_UPLOAD_PRESET) {
      formData.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET);
    }

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (data.error || !res.ok) {
      const errMsg = data?.error?.message || `Cloudinary upload failed with HTTP status ${res.status}`;
      console.error('❌ Cloudinary Upload Error:', errMsg);
      throw new Error(errMsg);
    }

    return {
      url: data.secure_url || data.url,
      publicId: data.public_id,
      format: data.format,
      bytes: data.bytes,
    };
  } catch (err) {
    console.error('❌ Cloudinary Upload Exception:', err.message);
    throw err;
  }
};
