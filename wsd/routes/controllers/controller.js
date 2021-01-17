const showLand = ({response, render}) => {
    render('land.ejs') ;
}

const showIndex = async({session, request, response, render}) => {
    if ((await session.get('authenticated'))) {
        render('index.ejs');
    } else {
        response.redirect('/login');
    }
}


export { showLand, showIndex } ;
