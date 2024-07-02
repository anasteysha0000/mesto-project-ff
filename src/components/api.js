const config = {
    baseUrl: 'https://nomoreparties.co/v1/pwff-cohort-1',
    headers: {
        authorization: '77907589-9e72-4481-9b6a-63164258805a',
        'Content-Type': 'application/json'
    }
}
function userInfo(){
    return fetch(`${config.baseUrl}/users/me`, {
        headers: {
            authorization: '77907589-9e72-4481-9b6a-63164258805a'}})
    .then(res => res.json())
    
}
function cardsInfo(){
    return fetch(`${config.baseUrl}/cards`, {
        headers: {
            authorization: '77907589-9e72-4481-9b6a-63164258805a'}})
    .then(res => res.json())

}
function editProfile(nameChange,aboutChange){
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: nameChange,
            about: aboutChange,
          })
      })
    .then(res => res.json())
}
function newCard(name,link){
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link,
          })
      })
    .then(res => res.json())
}
function deleteCard(cardId){
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers})
    .then(res => res.json())
}
export{userInfo,cardsInfo,editProfile,newCard,deleteCard}