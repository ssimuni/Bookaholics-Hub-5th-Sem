export const isLoggedIn =()=>{
    let data = localStorage.getItem("data");
    if(data != null) { return true;}
    else return false;
}

export const doLoggedIn =(data,next)=>{
    localStorage.setItem("data", JSON.stringify(data));
    next()
};

export const doLogout=(next)=>{
    localStorage.removeItem("data");
    next()
};

export const getCurrentUser =()=>{
    if(isLoggedIn()){
        let user=JSON.parse(localStorage.getItem("data"))
        return user;
    }
    else{
        return undefined;
    }
}