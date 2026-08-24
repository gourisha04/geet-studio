// Cloudinary Upload Helper (Backend only)
export const uploadToCloudinary = async (fileBufferOrBase64, folder = 'geet_studio') => {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    // Development fallback image/video payload
    console.log(`🖼️ [CLOUDINARY DEV MOCK UPLOAD] Folder: ${folder}`);
    const mockId = `mock_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    return {
      url: `https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80`,
      publicId: mockId,
      mocked: true,
    };
  }

  try {
    // Cloudinary REST API upload
    const formData = new URLSearchParams();
    formData.append('file', fileBufferOrBase64);
    formData.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET || 'unsigned');
    formData.append('folder', folder);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (data.error) {
      console.error('❌ Cloudinary Upload Error:', data.error.message);
      return {
        url: `https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80`,
        publicId: `fallback_${Date.now()}`,
      };
    }

    return {
      url: data.secure_url,
      publicId: data.public_id,
      format: data.format,
      bytes: data.bytes,
    };
  } catch (err) {
    console.error('❌ Cloudinary Upload Exception:', err.message);
    return {
      url: `https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80`,
      publicId: `fallback_${Date.now()}`,
    };
  }
};
