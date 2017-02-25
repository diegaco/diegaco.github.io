/*
*
*  Push Notifications codelab
*  Copyright 2015 Google Inc. All rights reserved.
*
*  Licensed under the Apache License, Version 2.0 (the "License");
*  you may not use this file except in compliance with the License.
*  You may obtain a copy of the License at
*
*      https://www.apache.org/licenses/LICENSE-2.0
*
*  Unless required by applicable law or agreed to in writing, software
*  distributed under the License is distributed on an "AS IS" BASIS,
*  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*  See the License for the specific language governing permissions and
*  limitations under the License
*
*/

/* eslint-env browser, es6 */

'use strict';

const applicationServerPublicKey = 'BKHgnLg9mTqIl0Xf0jSYVAmxL46poS0yi7qn_CqI5WxIqsezV4HygOvvrf6MOIoBvT_dMaCJmdDdkS2_NnQVLy4';

const pushButton = document.querySelector('.js-push-btn');

let isSubscribed = false;
let swRegistration = null;

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}


function initialiseUI() {
  pushButton.addEventListener('click', function(ev) {
    pushButton.disabled = true;
    if (isSubscribed) {
      unsuscribeUser();
    } else {
      subscribeUser();
    }
  });

  //Set the initial subscribe value
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    isSubscribed = !(subscription === null);

    if (isSubscribed) {
      console.log('User is subscribe');
    } else {
      console.log('User is not subscribe');
    }

    updateBtn();
  });
}

function unsuscribeUser() {
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    if (subscription) {
      return subscription.unsubscribe();
    }
  })
  .catch(function(err) {
    console.log('Error unsuscribing', err);
    /* body... */
  })
  .then(function() {
    updateSubscriptionOnServer(null);
    console.log('User is unsuscribed');
    isSubscribed = false;
    updateBtn();
  })
}

function subscribeUser() {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey
  })
  .then(function(subscription){
    console.log('User is subscribe');

    updateSubscriptionOnServer(subscription);
    isSubscribed = true;
    updateBtn();
  })
  .catch(function(err) {
    console.log('Failed to subscribe the user', err);
    updateBtn();
  });
}

function updateSubscriptionOnServer(subscription) {
  //TODO: Send subscription to application server

  const subscriptionJson = document.querySelector('.js-subscription-json');
  const subscriptionDetails = document.querySelector('.js-subscription-details');

  if (subscription) {
    subscriptionJson.textContent = JSON.stringify(subscription);
    subscriptionDetails.classList.remove('is-invisible');
  } else {
    subscriptionDetails.classList.add('.is-invisible');
  }
}

function updateBtn() {
  if (Notification.permission === 'denied') {
    pushButton.textContent = 'Push Messaging Blocked';
    pushButton.disabled = true;
    updateSubscriptionOnServer(null);
    return;
  }

  if (isSubscribed) {
    pushButton.textContent = 'Disable Push Messaging';
  } else {
    pushButton.textContent = 'Enable Push Messaging';
  }

  pushButton.disabled = false;
}

//Register Service Worker
if ('serviceWorker' in navigator && 'PushManager' in window) {
  console.log('Service Worker and PushManager is supported');

  navigator.serviceWorker.register('sw.js')
  .then(function(swReg) {
    console.log('Service Worker is registered', swReg);

    swRegistration = swReg;
    initialiseUI();
  })
  .catch(function (err) {
    console.log('Service Worker Error', err);
  })
} else {
  console.warn('Push messaging is not supported');
  pushButton.textContent = 'Push not Supported';
}
