// 手机号

// const isPhone = /^1[3-9]\d{9}$/;

const isPhone = /(\d{3}-|\d{4}-)?(\d{8}|\d{7})?/;



//邮箱

const isEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

//密码格式

const isPassword = /^[\w~`!@#$%^&*()-+=|\\<>,.?/\[\]{}:;'"\s]{6,16}$/;

//身份证

const isIdentity = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;

//港澳

const isHKCard = /^[CW]\d{8}$/;

//名称
//1.可以是中文
//2.可以是英文，允许输入点（英文名字中的那种点）， 允许输入空格
//3.中文和英文不能同时出现
//4.长度在20个字符以内

const isName = /^([\\u4e00-\\u9fa5]{1,20}|[a-zA-Z\\.\\s]{1,20})$/;



//特殊字符

const specialcharactersReg = /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/;


export {
    isName,
    
    isPhone,

    isEmail,

    isPassword,

    isIdentity,

    isHKCard,

    specialcharactersReg,

};