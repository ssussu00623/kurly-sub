USE kurlydb;
SHOW TABLES; 

-- 각 테이블 조회
select * from product;
select * from member;
select * from qna;
select * from wish;
select * from cart;
select * from review;
select * from notice;
select * from payments;
select * from view_categoty_pro_list;
select * from view_cart_list;
select * from orderList;


-- 각 테이블 구조

desc product;
desc member;
desc qna;
desc wish;
desc cart;
desc review;
desc notice;
desc payments;
desc view_categoty_pro_list;
desc view_cart_list;




-- ########################################
-- 아래는 팀원별로 테이블 생성하고 테스트 하는 공간입니다. 
-- 수정 있을 수 있으니 확정되면 kurlyDB에 추가될 예정!! 
-- ########################################

drop table orderList;

CREATE TABLE orderList (
  oid          int            PRIMARY KEY AUTO_INCREMENT,
  id           varchar(30)    NOT NULL, -- varchar(30) 으로 수정
  pid          int            NOT NULL,
  tid          varchar(50)    NOT NULL,
  qty          int            NOT NULL,
  total_price  int            NOT NULL,
  odate        datetime       NOT NULL,
  CONSTRAINT orderList_FK_ID FOREIGN KEY (id) REFERENCES member (id),
  CONSTRAINT orderList_FK_PID FOREIGN KEY (pid) REFERENCES product (pid)
);
