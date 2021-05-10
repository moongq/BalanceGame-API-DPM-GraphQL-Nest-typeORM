# balanceGame 생성하기 seleciton과 category 입력 가능.

```json
mutation {
  createBalanceGame(createBalanceGameInput: {
		userId:"05c508f7-f59d-45ea-b4a8-6452a2c6ba93"
    title: "newBalaneGame"
    balanceGameSelections: [{
      description: "Desciption1",
      subText: "Subtext1",
      textColor: "ff1323"
      order: 1
    }, {
      description: "Desciption2",
      subText: "Subtext2",
      textColor: "ff1323"
      order: 2
    }],
    balanceGameKeywords:[{
      name: "카테고리1ㅣ",
    },{
      name: "카테고리2"
    }]
  }) {
    id
    title
    balanceGameSelections {
      id
      description
      subText
      textColor
      balanceGameId
    }
    balanceGameKeywords {
      id
      name
      balanceGameId
    }
  }
}
```
