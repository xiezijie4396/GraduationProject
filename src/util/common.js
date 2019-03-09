export default{
    setParams(arr){
        var params = new URLSearchParams()
        arr.forEach(e => {
            params.append(e.name, e.param)
        })
        return params
    },
} 