export const getData = async (path) => {
  console.log(path, "GET_DATA")
  let data = await fetch(`http://localhost:3000/${path}`)
  data = await data.json()
  return data
}

export const postData = async (path, data) => {
  console.log(path, data, "POST_DATA")
  let result = await fetch(`http://localhost:3000/${path}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json"
    }
  })
  result = await result.json()
  return result
}

export const patchData = async (path, data) => {
  console.log(path, data, "PATCH_DATA")

  let result = await fetch(`http://localhost:3000/${path}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json"
    }
  })
  result = await result.json()
  return result
}

export const deleteData = async (path) => {
  console.log(path, "DELETE_DATA")

  let result = await fetch(`http://localhost:3000/${path}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json"
    }
  })
  result = await result.json()
  return result
}
