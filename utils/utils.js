export const getData = async (path) => {
    let data = await fetch(`http://localhost:3000/${path}`);
    data = await data.json();
    return data;
}

export const postData = async (path, data) => {
    let result = await fetch(`http://localhost:3000/${path}`, {
        method: 'POST',
        body: JSON.stringify(data)
    });
    result = await result.json();
    return result;
}

export const patchData = async (path, data) => {
    let result = await fetch(`http://localhost:3000/${path}`, {
        method: 'PATCH',
        body: JSON.stringify(data)
    });
    result = await result.json();
    return result;
}

export const deleteData = async (path) => {
    let result = await fetch(`http://localhost:3000/${path}`, {
        method: 'DELETE',
    });
    result = await result.json();
    return result;
}