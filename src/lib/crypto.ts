export const decrypt = async (data: string, key: string) => {
    const decodedData = Buffer.from(data, 'base64').toString('binary');
    const parsedData = JSON.parse(decodedData);

    const iv = Uint8Array.from(atob(parsedData.iv), c => c.charCodeAt(0));
    const encryptedData = Uint8Array.from(atob(parsedData.encryptedData), c => c.charCodeAt(0));

    const keyBuffer = await crypto.subtle.importKey(
        'raw',
        new TextEncoder().encode(key),
        'AES-GCM',
        true,
        ['decrypt']
    );

    const decryptedData = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv },
        keyBuffer,
        encryptedData
    );

    const decryptedText = new TextDecoder().decode(decryptedData);

    return JSON.parse(decryptedText);
}

