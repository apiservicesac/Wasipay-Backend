export class ImageValidator {
    private readonly whiteListMimeType = [
		'image/png',
		'image/jpg',
		'image/jpeg',
	];

    constructor () {
    }

    run (image : any) : boolean {
        if (this.whiteListMimeType.includes(image.mimetype)) return true
        return false            
    }
}

