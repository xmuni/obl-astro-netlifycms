import cloudinaryContent from './cloudinaryContent.json'


function sortCloudinaryImagesByFolder(allImages) {

    const imagesByFolder = {}

    const images = allImages.filter(data => data.resource_type==='image')
    
    for(const image of images) {
    
        const { folder, width, height, secure_url, format, public_id } = image

        const foldername = folder.toLowerCase()

        // Get the filename from the public_id, removing any preceding path
        let filename = public_id.includes('/') ? public_id.split('/').slice(-1)[0] : public_id

        // Clean up the name
        const name = filename
            .split('_').slice(0,-1).join(' ')
            .replace('ok','').trim()
        // console.log(name)

        if(!imagesByFolder.hasOwnProperty(foldername)) {
            imagesByFolder[foldername] = []
        }
    
        imagesByFolder[foldername].push({
            url: secure_url,
            folder: foldername,
            filename,
            name,
            // author: public_id.includes('_vm_') ? 'Vittorio Minuzzo' : 'mmoblfoto.it',
            public_id,
            width,
            height,
            format,
        })
    }

    for(const folderImages of Object.values(imagesByFolder)) {
        folderImages.sort((a,b) => a.filename>b.filename ? 1 : -1)
    }

    /*
    const sortedImagesByFolder = {}
    for(const key of Object.keys(imagesByFolder)) {
        if(key !== 'persona') continue
        console.log('Unsorted:',imagesByFolder[key])
        sortedImagesByFolder[key] = imagesByFolder[key].sort((a,b) => a.filename<b.filename ? 1 : -1)
        console.log('Sorted:',sortedImagesByFolder[key])
    }

    return sortedImagesByFolder
    */

    return imagesByFolder
}

// fs.writeFileSync('data/cloudinaryContentByFolder.json', JSON.stringify(imagesByFolder,null,4))
// console.log(imagesByFolder)

const cloudinaryImages = sortCloudinaryImagesByFolder(cloudinaryContent.resources)

export default cloudinaryImages