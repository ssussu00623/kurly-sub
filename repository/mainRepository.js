import { db } from './db.js';


/*************************** 
 *  1. 프로덕트 리스트 값 가져오기 
***************************/
export const getProductList = async({category}) => {
  let sql =``;
  
  if(category === 'new'){
    sql =`SELECT *, CONCAT(dc, '%') AS discountRate
          from view_category_pro_list
          where pdate between date_sub((select max(pdate) from view_category_pro_list), interval 300 day)
          and (select max(pdate) from view_category_pro_list)
          order by pdate desc;`;
  }else if(category === 'best'){
     sql=`select vw.* , concat(dc, '%') as discountRate
            from  view_category_pro_list as vw, orderList as py
           where vw.pid = py.pid
             and   py.qty >= 8
     `; 
  }else if(category === 'discount'){
    sql =`select   *, concat(dc, '%') as discountRate
            from   view_category_pro_list 
          where   dc >=30;
    `;
  }else if(category === 'special'){
    sql=`select  *, concat(dc, '%') as discountRate
           from  view_category_pro_list `;
  }else{
    sql=`select  *, concat(dc, '%') as discountRate
           from  view_category_pro_list
          where  dc >=50
       order by  dc desc`;
  }
    
  const [result] = await db.execute(sql);
  return result;
}


/*************************** 
 *  2. 메인화면 아이템 서치
***************************/
export const getSearchItem = async({search}) => {
  const searchKeyWord = `%${search}%`;
  const sql =`
    select *, concat(dc, '%') as discountRate
      from view_category_pro_list 
     where name like ? 
  `;

 const [result] = await db.execute(sql, [searchKeyWord]);
 return result;
}

/*************************** 
 *  3.대분류 카테고리  값 가져오기
***************************/
export const getCategoryTitleList = async() =>{
  const sql =`select * from category`;

  const [result] = await db.execute(sql);
  return result;
};

/*************************** 
 *  3-1. 대분류 카테고리 상품 리스트 가져오기
***************************/
export const getCategoryProductList = async({cid}) =>{
  const sql =`
        select *, concat(dc, '%') as discountRate 
        from view_category_pro_list 
        where cate_depth1 = ?`;

  const [result] = await db.execute(sql, [cid]);
  return result;
};


/*************************** 
 *  4. 소분류 카테고리  값 가져오기
***************************/
export const getSubCategoryTitleList = async(req, res) =>{
  const sql =`select * from sub_category`;

  const [result] = await db.execute(sql);
  return result;
};

/*************************** 
 *  4-1. 소분류 카테고리 상품 리스트 가져오기
***************************/
export const getSubCategoryProductList = async({cid, sid}) =>{
  const sql =`
    select * , concat(dc, '%') as discountRate
      from   view_category_pro_list 
     where   cate_depth1 = ?
       and   cate_depth2 = ?
  `;

  const [result] = await db.execute(sql, [cid, sid]);
  return result;
};

/*************************** 
 *  5. 유저 정보 가져오기 - address
***************************/
export const getUserInfo = async({id}) => {
  const sql =`
    select address from member where id = ?
  `;
  const [result] = await db.execute(sql, [id]);
  return result[0]; 
};

/*************************** 
 *  6. 유저 address 업데이트
***************************/
export const getUserAddressUpdate = async({address, id}) => {
  const sql = `update member set address = ? where id = ?`;

  const [result] = await db.execute(sql, [address,id]);
  return result.affectedRows;
};

/*************************** 
 *  7. 최근 본 상품 가져오기 
***************************/
export const getRecentlyViewItem = async({pidArray}) =>{
  const pidList = pidArray.map(()=>'?').join(",");
  const sql = `select pid, concat('http://13.209.88.179:9000/',JSON_UNQUOTE(JSON_EXTRACT(upload_img, '$[0]'))) as upload_img 
               from product 
               where pid in (${pidList}) `;

  const [result] = await db.execute(sql, pidArray);
  return result;
}


/*************************** 
 *  8. 위시리스트 배열 가져오기
***************************/
export const getWishListPid = async({id}) =>{
  const sql =`select JSON_EXTRACT(wish, '$') as wish from member where id=?`;

  const [result]= await db.execute(sql, [id]);
  // console.log('레파지토리 :: 메인 위시리스트 배열 select',result);
  return result;
};

/*************************** 
 *  9. 위시리스트 상품 정보 INSERT
***************************/
export const setWishList = async(data) =>{
  const sql=`update member set wish = ? where id = ?`;
  const values = [ JSON.stringify(data.wishList), data.id];

  const [result] = await db.execute(sql, values);
  return result.affectedRows;
};  

/*************************** 
 *  10. 위시리스트 상품 정보 가져오기 
***************************/
export const getWishListInfo = async({id})=>{
  // const pidList = pidArray.map(()=> '?').join(",");
  const sql =`
      select  P.pid
              , P.subject as name
              , P.sub_desc as description
              , P.price as originalPrice
              , P.dc 
              , concat(format(P.price - (P.price * (P.dc * 0.01)),0),'원') as discountedPrice
              , concat('http://13.209.88.179:9000/',JSON_UNQUOTE(JSON_EXTRACT(P.upload_img, '$[0]'))) as image_url
      from    product P, member m
      where   JSON_CONTAINS(m.wish, Cast(p.pid as JSON))
      and     m.id =? 
  `;

  const [result] = await db.execute(sql, [id]);
  return result;
}  


