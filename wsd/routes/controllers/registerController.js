import { validate, required } from "../../deps.js";

const getData = async(request) => {
    const data = {
        username: '',
        password1: '',
        password2: '',
        invitation: '',
        note:''
    }
    if (request) {
        const body = request.body();
        const params = await body.value;
        data.username = params.get('username');
        data.password1 =  params.get('password1');
        data.password2 = params.get('password2');
        data.invitation = params.get('invitation');
    }
    return data;
}

const validationRules = {
    username: [required],
    password1: [required],
    password2: [required],
    invitation: [required]
}

const showRegister = async({render}) => {
    const data = await getData();
    render('register.ejs', data);
}

const register = async({session, request, response, render}) => {
    const data = await getData(request);

    //First, check whether empty or note
    const [pass, errors] = await validate(data, validationRules);
    if (pass) {
        //Second, check whether two passwords are the same
        if (data.password1 === data.password2) {
            //检查是否有该用户名、密码长度规定、用户名长度规定
            //数据库添加信息
            //session添加信息
            //检查邀请码是否正确
            response.redirect('/login');
        } else {
            data.note = 'Two passwords are different.';
            render('register.ejs', data);
        }
    } else {
        data.note = 'All above boxes are required.';
        render('register.ejs', data);
    }
}

export { showRegister, register };
