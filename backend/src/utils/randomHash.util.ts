 function randomHash(){
        const text = "abcdef-0987654321ghi[]jkl!()mnopqABCDEFGHIJKLMNOPQRSTUVWXYZrstuvwxyz";
        const characters = text.split('');
        let hash="";

        for(let size = 0; size <10; size++ ){
            const randomIndex = Math.ceil(Math.random() * characters.length)
            hash += characters[randomIndex];
        }

        return hash;
}

export default randomHash;