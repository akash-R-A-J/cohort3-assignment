export const randomHash = (len: number) => {
    const options = "aiuwhoa738y21031irmzux20dh";
    const length = options.length;
    
    let ans = "";
    
    for(let i=0; i<len; i++){
        ans += options[Math.floor((Math.random() * length))];
    }
    
    return ans;
}