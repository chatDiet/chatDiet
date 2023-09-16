# chatDiet
JavaScript/Node.js/MySQL/AWS RDS,E3/JWT/mongoDB/Express


# 🦾 [chatDiet] 브로셔

![노션상단이미지-001](https://github.com/chatDiet/chatDiet/assets/90279468/d3e95c01-52e3-4485-bc4b-574021bd7e6d)



## team github 바로가기

https://github.com/chatDiet/chatDiet



## chatDiet 바로가기

http://chatdietv1-env.eba-trj74i4k.ap-northeast-2.elasticbeanstalk.com/



## 🎯서비스 기획 배경

<aside>
📢 1:1로 관리받는 헬스케어 웹앱 **! chatDiet!**

안녕하세요! chatDiet 서비스를 만든 연봉1조 입니다!

내 주변의 괜찮은 헬스장,트레이너를 찾기 어려우신가요 ?  트레이너쌤과 번호를 나누지 않고도 나의 삼시세끼 식단과 운동 루틴을 1:1로 관리받고 싶으신가요 ?

그런분들을 위해 만들어진 헬스케어 웹앱  **chatDiet** 입니다 !

회원들은 캘린더에 식단과 운동 루틴을 작성해 트레이너와 1:1 실시간 채팅으로 관리받을 수 있으며 , 내 주변의 헬스장/트레이너의 정보를 조회하고 , 리뷰를 남길 수 있습니다

트레이너는 캘린더에 회원들의 일정과 남은 PT 횟수를 관리할 수 있습니다 

헬스장 사장님들은 자신의 업체의 정보를 입력하고 노출시킬 수 있습니다

</aside>



## ✅ 사용자 가이드

![진짜 설명서](https://github.com/hyem00/node_realmegosa/assets/90279468/b400278a-7637-434d-b8dc-1e50aee4d3e6)



## ⛑️ 서비스 아키텍쳐

![image](https://github.com/chatDiet/chatDiet/assets/90279468/53f4b6fb-5953-4d08-a261-796f8b9b68ed)






## 👨‍🏭 주요 기술

- Node.js
- mysql , aws rds
- socket.io + mongoDB
- aws elastic beanstalk + git action + docker
- aws s3
    
    

## 🛠️ 트러블 슈팅

- 카카오톡 소셜 로그인
    - 문제사항 :  카카오톡 API 에서 발급해주는 토큰과 기존 로컬 로그인에서 발급해주는 토큰의 차이
    이미 발급된 토큰을 인위적으로 변경할 수 없음
    - 고민사항 : 기존 만들어둔 로컬 로그인 API를 크게 변경하지않고 함께 쓸 수 있는 방법이 없을까 고민
    - 해결 : 카카오톡 API 에서 발급해준 토큰에서 원하는 값 (email) 정보만 빼와서 로컬 로그인에서 토큰을 재발급 하게 로직 수정
    로그인 타입으로 구분
- AWS S3 다중 업로드
    - 문제사항 : 여러 개의 이미지 저장 → url 길이가 길어짐 → 문자열이 잘려서 저장
    - 고민사항 : 단순히 자료형의 길이만 늘리는 일은 데이터 낭비라 판단 ,  URL 단축 서비스 (Bitly) 사용해야할지 고민.
    - 해결 : Aws s3 에 올라가는 path를 originalname이 들어가지 않게 수정, Bitly서비스는 프로젝트가 무거워지는것을 고려해 사용하지 않기로 결정
- 이미지 리사이징
    - 문제사항 : 2.4GB 이상의 이미지 업로드 시 빈칸으로 인식되는 에러 발견
    - 고민사항: 리사이징을 하고 나서 aws에 업로드를 할지 , 업로드 후 가져올때 리사이징을 할지 고민.
    - 해결방법 : 리사이징 후 업로드하는 방식이  서버비용을 아낄 수 있고 , 현재 데이터 전송량이 많지 않기때문에 현 프로젝트에 적합하다고 판단, multer-s3-transform으로 이미지 리사이징 (sharp) 을 구현하기로 결정.
- 배포 시간 개선(docker image)
    - 고민사항: 배포하는 시간 단축을 고민, docker image의 크기 축소하는 방향
    - 해결방법: Docker Optimize
          + 배포 시간 : (대략) 6분 => 3분
          + Docker Image Compressed Size : (대략) 860MB => 210MB
          + Docker Container Ram 사용량 : (대략) 150Mb => 110Mb
          + Dokcer Container 프로세스 수 : 7개 => 1개
    


## 👌 주요 기능

- 소셜로그인
- 다중업로드 (이미지 리사이징)
- 위치기반 카카오지도 API
- 1:1 실시간 채팅 (이미지 전송 가능)

## 📈 연봉 1조
![우리팀소개-001](https://github.com/hyem00/node_realmegosa/assets/90279468/1cc35925-344a-46c1-953e-896a7e070946)
