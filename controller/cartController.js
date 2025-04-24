import * as repository from '../repository/cartRepository.js ' 

/**************************************
        Carts 전체조회 
**************************************/
export const getItems = async(req, res) => {
    const result = await repository.getItems(req.body);
    res.json(result)
    res.end();
};


/*************************************
        장바구니 새로운 아이템 저장
*************************************/

export const addCart = async(req, res) => {
    console.log('req.body 확인', req.body);
    const result = await repository.addCart(req.body);
    res.json(result)
    res.end();
};


/*************************************
        장바구니 새로운 아이템 업데이트
*************************************/
export const updateQty = async(req, res) => {
    const result = await repository.updateQty(req.body);
    res.json(result);
    res.end();
};



/*************************************
        장바구니 전체 카운트 조회 header
*************************************/

export const getCount = async(req, res) => {
    const result = await repository.getCount(req.body);
    res.json(result);
    res.end();
};



/*********************************************
        장바구니 아이템 개별 삭제 (x 아이콘)
*******************************************/

export const deleteItem = async(req, res) => {
    const result = await repository.deleteItem(req.body);
    res.json(result)
    res.end();
};


/*********************************************
        장바구니 선택 삭제
*******************************************/

export const deleteCheckedItems = async(req, res) => {
    const result = await repository.deleteCheckedItems(req.body);
    res.json(result)
    res.end();
};
