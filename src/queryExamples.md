# balanceGame 생성하기 seleciton과 category 입력 가능.

# M createBalanceGame

```graphql
HTTP HEADER
{
  "authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzb2NhaWxJZCI6MTcyMDM3MDE3OCwidXNlcklkIjoiMTg0NWI2MWUtM2NhMi00OWM4LWJkMDktNDA0Y2U5NzRkNTQ5IiwiaWF0IjoxNjIxMDU5MzgzLCJleHAiOjE2NTI1OTUzODN9.AiDa9DFGMAHyScvcYdKthWYpGgrtL6A0OrM7Wdu1T10"
}

mutation {
  createBalanceGame(
    createBalanceGameInput: {
      description: "this is balancegame1"
      balanceGameSelections: [
        { description: "Desciption1", textColor: "ff1323", order: 1 }
        { description: "Desciption2",  textColor: "ff1323", order: 2 }
      ]
      balanceGameKeywords: [{ name: "카테고리1ㅣ" }, { name: "카테고리2" }]
    }
  ) {
    id
    description
    balanceGameSelections {
      id
      description
      textColor
      balanceGameId
      backgroundColor
      backgroundImage
      order
    }
    balanceGameKeywords {
      id
      name
      balanceGameId
    }
  }
}
```

# M updateBalanceGame

```graphql
mutation {
  updateBalanceGame(
    id: "d3019d43-c769-4024-82f9-cb979e9eade5"
    updateBalanceGameInput: {
      description: "dddd"
      balanceGameSelections: [
        {
          id: "46cba631-6692-4362-8ea1-3d7691463d68"
          description: "change desc1"
          textColor: "ff1323"
          backgroundColor: "der222"
          backgroundImage: "http~"
          order: 1
        }
        {
          id: "b3c0e407-e510-476a-89c8-dba29653ed8a"
          description: "change desc2"
          textColor: "ff1323"
          backgroundColor: "der222"
          backgroundImage: "http"
          order: 2
        }
      ]
      balanceGameKeywords: [{ name: "카테" }, { name: "카테고리4" }]
    }
  ) {
    id
    description
    balanceGameSelections {
      id
      description
      textColor
      balanceGameId
      backgroundColor
      backgroundImage
      order
    }
    balanceGameKeywords {
      id
      name
    }
  }
}
```

# M removeBalanceGame

```graphql
mutation {
  removeBalanceGame(id: "16cf0138-c235-4723-bd6e-1c33cfcb41ab")
}
```

# M fileUpload

key: operations

value: { "query": "mutation UploadFile($file1:Upload!) { uploadFile(file1:$file1) }", "variables": { "file1": null}}

key: map

value: { "0": ["variables.file1"] , "1": ["variables.file2"]}

key: 0

value: 파일

# 로그인 관련 작업

## M login

> 로그인 기능 (프론트에 토큰 받아서 진행)

```graphql
mutation {
  login(loginUserInput: { socialType: "kakao", socialKey: "CKKEwhnpV4ImqIALe0_A_scKiehXiRxp3kolbQorDR4AAAF5bekcyw" }) {
    jwt
    email
    status
  }
}
```

## Q mypage

> 마이페이지 확인

```graphql
query {
  mypage {
    id
  }
}
```

- HTTP headers

```
{
  "authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzb2NhaWxJZCI6MTcyMDM3MDE3OCwidXNlcklkIjoiMTg0NWI2MWUtM2NhMi00OWM4LWJkMDktNDA0Y2U5NzRkNTQ5IiwiaWF0IjoxNjIwNTYwMjc4LCJleHAiOjE2NTIwOTYyNzh9.ppVgebenN8R7IeHN3Is6D3KX-CXMMgjmhP6crDyqu_Y"
}
```

## M setProfile

> 프로필 업데이트 진행 headers authorization 필요

```graphql
mutation {
  setProfile(setProfileInput: { nickname: "test", email: "adoTest@gmail.com" }) {
    id
    email
    nickname
  }
}
```
