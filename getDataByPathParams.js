export const getDataByPathParams=(data,locationType,LocationName)=>{
    return data.filter((destination)=>{
        return destination[locationType].toLowerCase()===LocationName.toLowerCase()
    })
}