(()=>{"use strict";var e=document.querySelector(".places__list"),t=document.querySelector(".popup_type_edit"),n=document.querySelector(".popup_type_new-card"),r=document.querySelector(".profile__edit-button"),o=document.querySelector(".profile__add-button"),c=document.querySelector(".popup_type_image"),a=document.querySelector(".popup_type_avatar"),i=document.querySelector(".popup_type_delete"),u=[t,n,c,a,i],s=t.querySelector(".popup__form"),l=s.querySelector(".popup__input_type_name"),p=s.querySelector(".popup__input_type_description"),d=n.querySelector(".popup__form"),f=d.querySelector(".popup__input_type_card-name"),_=d.querySelector(".popup__input_type_url"),m=document.querySelector(".profile__title"),y=document.querySelector(".profile__description"),v=document.querySelector(".profile__image"),h=a.querySelector(".popup__form"),b=h.querySelector(".popup__input_type_url_img"),S=i.querySelector(".popup__form"),q={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__input_type_error-active"};function k(e,t){Array.from(e.querySelectorAll(t.inputSelector)).forEach((function(n){e.querySelector(".".concat(n.id,"-error")).textContent="",n.classList.remove(t.inputErrorClass),n.classList.remove(t.errorClass)}))}var C=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))};function g(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",L)}function E(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",L)}function L(e){var t=document.querySelector(".popup_is-opened");"Escape"===e.key&&(E(t),k(t,q))}var j={baseUrl:"https://nomoreparties.co/v1/pwff-cohort-1",headers:{authorization:"77907589-9e72-4481-9b6a-63164258805a","Content-Type":"application/json"}};function x(e,t){var n,r=e.target.closest(".card");(n=t._id,fetch("".concat(j.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:j.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(){r.remove()})).catch((function(e){console.log("Ошибка при удалении карточки: ".concat(e.status))}))}function A(e,t,n,r,o){var c=document.querySelector("#card-template").content.querySelector(".places__item").cloneNode(!0),a=c.querySelector(".card__image");a.src=e.link,a.alt=e.name,c.querySelector(".card__title").textContent=e.name;var u=c.querySelector(".card__delete-button");return e.owner._id!==o?u.remove():u.addEventListener("click",(function(n){n.preventDefault(),g(i),S.addEventListener("submit",(function r(o){o.preventDefault(),t(n,e),E(i),S.removeEventListener("submit",r)}))})),c.querySelector(".card__like-button").addEventListener("click",(function(t){n(t,e)})),e.likes.some((function(e){return e._id===o}))&&s.querySelector(".card__like-button").classList.add("card__like-button_is-active"),c.querySelector(".likes-counter").textContent=e.likes.length,a.addEventListener("click",(function(){r(e.link,e.name,e.name)})),c}function P(e,t){var n,r=e.target.classList.contains("card__like-button_is-active");(r?(n=t._id,fetch("".concat(j.baseUrl,"/cards/likes/").concat(n),{method:"DELETE",headers:{authorization:"77907589-9e72-4481-9b6a-63164258805a"}}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))):function(e){return fetch("".concat(j.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:{authorization:"77907589-9e72-4481-9b6a-63164258805a"}}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(t._id)).then((function(t){e.target.classList.toggle("card__like-button_is-active",!r),e.target.closest(".places__item").querySelector(".likes-counter").textContent=t.likes.length})).catch((function(e){console.log("Ошибка при лайке или анлайке карточки: ".concat(e.status))}))}function U(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function w(e,t,n){c.querySelector(".popup__image").src=e,c.querySelector(".popup__image").alt=t,c.querySelector(".popup__caption").textContent=n,g(c)}Promise.all([fetch("".concat(j.baseUrl,"/users/me"),{headers:{authorization:"77907589-9e72-4481-9b6a-63164258805a"}}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})),fetch("".concat(j.baseUrl,"/cards"),{headers:{authorization:"77907589-9e72-4481-9b6a-63164258805a"}}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))]).then((function(t){var n,r,o=(r=2,function(e){if(Array.isArray(e))return e}(n=t)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,s=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){s=!0,o=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(s)throw o}}return i}}(n,r)||function(e,t){if(e){if("string"==typeof e)return U(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?U(e,t):void 0}}(n,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=o[0],a=o[1],i=c._id;m.textContent=c.name,y.textContent=c.about,v.style.backgroundImage="url(".concat(c.avatar,")"),a.forEach((function(t){var n=A(t,x,P,w,i);e.append(n)}))})),u.forEach((function(e){var t;(t=e).addEventListener("click",(function(e){e.target===t&&(E(t),k(t,q))})),t.querySelector(".popup__close").addEventListener("click",(function(){E(t),k(t,q)})),function(e){e.classList.add("popup_is-animated")}(e)})),s.addEventListener("submit",(function(e){var n,r;e.preventDefault(),e.submitter.textContent="Сохранение...",(n=l.value,r=p.value,fetch("".concat(j.baseUrl,"/users/me"),{method:"PATCH",headers:j.headers,body:JSON.stringify({name:n,about:r})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){m.textContent=e.name,y.textContent=e.about,E(t)})).catch((function(e){console.error(e)})).finally((function(){return e.submitter.textContent="Сохранение"}))})),d.addEventListener("submit",(function(t){var r;t.preventDefault(),t.submitter.textContent="Сохранение...",(r={name:f.value,link:_.value},fetch("".concat(j.baseUrl,"/cards"),{method:"POST",headers:j.headers,body:JSON.stringify({name:r.name,link:r.link})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(t){e.prepend(A(t,x,P,w,t.owner._id)),E(n)})).catch((function(e){console.log("Ошибка при заполнении новой карточки: ".concat(e))})).finally((function(){t.submitter.textContent="Сохранить"})),d.reset()})),r.addEventListener("click",(function(){var e=document.querySelector(".profile__title").textContent,t=document.querySelector(".profile__description").textContent;l.value=e,p.value=t})),r.addEventListener("click",(function(){g(t)})),o.addEventListener("click",(function(){g(n)})),v.addEventListener("click",(function(){g(a),k(h,q)})),h.addEventListener("submit",(function(e){var t;e.preventDefault(),e.submitter.textContent="Сохранение...",(t=b.value,fetch("".concat(j.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:j.headers,body:JSON.stringify({avatar:t})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){v.style.backgroundImage="url(".concat(e,")"),E(a)})).catch((function(e){console.log("Ошибка при изменении аватара: ".concat(e))})).finally((function(){e.submitter.textContent="Сохранить"})),h.reset()})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);C(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){(function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.textContent="",r.classList.remove(n.errorClass)}(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)})(e,o,t),C(n,r,t)}))}))}(t,e)}))}(q)})();