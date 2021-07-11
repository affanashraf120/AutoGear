export const imageUpload = async (file: File) => {
    if (file !== null) {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "products");
        data.append("cloud_name", "autogear");
        const res = await fetch("https://api.cloudinary.com/v1_1/autogear/image/upload", {
            method: "POST",
            body: data,
        });
        const res2 = await res.json();
        return res2.url;
    }
};
