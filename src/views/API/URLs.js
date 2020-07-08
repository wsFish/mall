/*查询所有商品的URL*/
export function ALL_SHOPPING_URL(id, goodsName) {
  if (id && goodsName) {
    return `./api/chenzw_fxsc/goods/selgoods.action?page=1&limit=10&id=${id}&goodsName=${goodsName}`;
  } else {
    return `./api/chenzw_fxsc/goods/selgoods.action?page=1&limit=10`;
  }
}

/*首页URL*/
export const HOME_POSITION = "./api/chenzw_fxsc/pca/citylist.action";
//查询市目录

/*分类URL*/
export function SORT_URL_SECOND(pid) {
  return `./api/chenzw_fxsc/goods/selsecondlist.action?page=1&limit=10&pid=${pid}`;
} //分类页面二级目录

export const SORT_URL_FIRST =
  "./api/chenzw_fxsc/goods/selfirstlist.action?page=1&limit=10"; //分类页面一级目录

export function SORT_URL_THIRD(id) {
  return `./api/chenzw_fxsc/goods/sellistgoods.action?page=1&limit=10&secondList=${id}`;
} //分类页面三级目录

/*购物车URL*/
export const CART_URL_GET_DATA =
  "./api/chenzw_fxsc/choose/selchoosegoods.action"; //获取购物车信息

export const CART_URL_MODIFY =
  "./api/chenzw_fxsc/choose/editchoosegoods.action"; //修改购物车内容

/* 我的页面URL */
export const MY_URL_GET_DATA = "./api/chenzw_fxsc/user/seluser.action"; //获取用户信息

export const MY_URL_EDIT_DATA = "./api/chenzw_fxsc/user/edituser.action"; //修改用户信息

/*登录页面URL*/
export const SING_IN_URL = "./api/chenzw_fxsc/user/login.action"; //登录

export const REGISTER_URL = "./api/chenzw_fxsc/user/register.action"; //注册
