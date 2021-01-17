import { validate, required } from "../../deps.js";

const getData = async(request) => {
    const data = {
        username:'',
        password:'',
        note: ''
    }
    if (request) {
        const body = request.body();
        const params = await body.value;
        data.username = params.get('username');
        data.password = params.get('password');
    }
    return data;
}

const validationRules = {
    username: [required],
    password: [required]
}

const showLogin = async({response, render}) => {
    const data = await getData();
    render('login.ejs', data);
}

const authenticate = async({session, request, response, render}) => {
    const data = await getData(request);

    // First, validate whether empty or not
    const [passes, errors] = await validate(data, validationRules);
    if (!passes) {
        data.note = "Both username and password are required.";
        render('login.ejs', data);
    } else {
//检查是否有该用户名、密码长度规定、用户名长度规定
        //此处省略数据库部分，先验证有没有username，再验证有没有密码和哈希值是否匹配
        if (data.username == 'admin' && data.password == "admin") {
            await session.set('authenticated', true);
            //此处还要向session传入id和username
            data.note = "Congratulation. Login sucessfully!";

            //不知道如何先渲染再重定向
            // await render('login.ejs', data);
            // await new Promise(resolve => setTimeout(resolve, 10 * 1000));
            response.redirect('/index');
        } else {
            data.note = "Wrong username or password, please try again.";
            render('login.ejs', data);
        }
    }
}

export { showLogin, authenticate };
