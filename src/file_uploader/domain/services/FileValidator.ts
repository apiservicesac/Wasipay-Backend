export class FileValidator {
    private readonly whiteListMimeType = [
		'image/png',
		'image/jpg',
		'image/jpeg',
	];

    constructor () {
    }

    run (file : any) : boolean {
        if (this.whiteListMimeType.includes(file.mimetype)) return true
        return false            
    }
}

