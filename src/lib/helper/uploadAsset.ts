export async function uploadAsset(file: File) {
    try {
      const response = await fetch('/api/uploadAsset');

      if (!response.ok) {
        console.error('Upload Asset API Error:', response.status, response.statusText);
        return 'error';
      }

      const json = await response.json();
      console.log('Upload Asset API Response:', json);

      // Überprüfe die Struktur der API-Antwort
      if (!json || !json.createAsset) {
        console.error('Invalid API response structure:', json);
        return 'error';
      }

      const createAsset = json.createAsset;
      
      if (!createAsset.id) {
        console.error('No asset ID in response:', createAsset);
        return 'error';
      }

      if (!createAsset.upload || !createAsset.upload.requestPostData) {
        console.error('No upload data in response:', createAsset);
        return 'error';
      }

      const assetId = createAsset.id;
      const uploadData = createAsset.upload.requestPostData;
      
      // Überprüfe alle erforderlichen Upload-Parameter
      const requiredFields = ['url', 'date', 'key', 'signature', 'algorithm', 'policy', 'credential', 'securityToken'];
      for (const field of requiredFields) {
        if (!uploadData[field]) {
          console.error(`Missing required upload field: ${field}`, uploadData);
          return 'error';
        }
      }

      const form = new FormData();
      form.append('X-Amz-Date', uploadData.date);
      form.append('key', uploadData.key);
      form.append('X-Amz-Signature', uploadData.signature);
      form.append('X-Amz-Algorithm', uploadData.algorithm);
      form.append('policy', uploadData.policy);
      form.append('X-Amz-Credential', uploadData.credential);
      form.append('X-Amz-Security-Token', uploadData.securityToken);
      form.append('file', file);

      const fileUploadResponse = await fetch(uploadData.url, {
        method: 'POST',
        body: form
      });

      if (fileUploadResponse.ok) {
        console.log('File uploaded successfully:', file.name, 'Asset ID:', assetId);
        return assetId;
      } else {
        console.error('File upload failed:', fileUploadResponse.status, fileUploadResponse.statusText);
        return 'error';
      }
    } catch (error) {
      console.error('Upload Asset Error:', error);
      return 'error';
    }
}

export async function uploadImage(fileName, dataUrlString) {
  if (!fileName || !dataUrlString) {
    console.error('Missing fileName or dataUrlString');
    return 'error';
  }

  try {
    const response = await fetch('/api/uploadAsset');
    
    if (!response.ok) {
      console.error('Upload Image API Error:', response.status, response.statusText);
      return 'error';
    }

    const json = await response.json();
    console.log('Upload Image API Response:', json);

    // Überprüfe die Struktur der API-Antwort
    if (!json || !json.createAsset) {
      console.error('Invalid API response structure:', json);
      return 'error';
    }

    const createAsset = json.createAsset;
    
    if (!createAsset.id) {
      console.error('No asset ID in response:', createAsset);
      return 'error';
    }

    if (!createAsset.upload || !createAsset.upload.requestPostData) {
      console.error('No upload data in response:', createAsset);
      return 'error';
    }

    const imageData = dataUrlToFile(dataUrlString, fileName);
    const imageId = createAsset.id;
    const uploadData = createAsset.upload.requestPostData;

    // Überprüfe alle erforderlichen Upload-Parameter
    const requiredFields = ['url', 'date', 'key', 'signature', 'algorithm', 'policy', 'credential', 'securityToken'];
    for (const field of requiredFields) {
      if (!uploadData[field]) {
        console.error(`Missing required upload field: ${field}`, uploadData);
        return 'error';
      }
    }

    const form = new FormData();
    form.append('X-Amz-Date', uploadData.date);
    form.append('key', uploadData.key);
    form.append('X-Amz-Signature', uploadData.signature);
    form.append('X-Amz-Algorithm', uploadData.algorithm);
    form.append('policy', uploadData.policy);
    form.append('X-Amz-Credential', uploadData.credential);
    form.append('X-Amz-Security-Token', uploadData.securityToken);
    form.append('file', imageData);

    const fileUploadResponse = await fetch(uploadData.url, {
      method: 'POST',
      body: form
    });

    if (fileUploadResponse.ok) {
      console.log('Image uploaded successfully:', fileName, 'Asset ID:', imageId);
      return imageId;
    } else {
      console.error('Image upload failed:', fileUploadResponse.status, fileUploadResponse.statusText);
      return 'error';
    }
  } catch (error) {
    console.error('Upload Image Error:', error);
    return 'error';
  }
}

export async function publishAsset(id: string) {
  if (id === 'error ') return id;
  const fetchString = '/api/uploadAsset/publish/' + id;
  const publishAssetsResponse = await fetch(fetchString);
  if (publishAssetsResponse.ok) {
    const json = await publishAssetsResponse.json();
    return JSON.stringify(json);
  } else {
    return 'error';
  }
}

function dataUrlToFile(dataUrl: string, fileName: string) {
  const buffer = Buffer.from(dataUrl.split(',')[1], 'base64');
  return new File([buffer], fileName, { type: 'image/png' });
}
