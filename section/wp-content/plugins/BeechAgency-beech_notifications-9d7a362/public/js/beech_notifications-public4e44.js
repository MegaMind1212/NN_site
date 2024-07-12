console.log("BEECH NOFITICATIONS LOADED v2");

// Beech Notification JS
(function () {
  document.addEventListener("DOMContentLoaded", function () {

    const BEECH_notifications = document.querySelector(".BEECH_notifications");

    if (!BEECH_notifications) return false;

    console.log("Notifications: ", BEECH_notifications_data);

    let n = 0;

    BEECH_notifications_data.forEach( notification => {
      const type = notification.type;
      // Get the template

      const template = document.getElementById(
        "BEECH_notifications--" + type
      );
      const template_clone = template.content.cloneNode(true);

      template_clone.querySelector(".BEECH_notifications--title").textContent = notification.title;
      template_clone.querySelector(".BEECH_notifications--content").innerHTML = notification.content;
      template_clone.querySelector(".BEECH_notification").setAttribute('data-beech-notification-id', notification.ID );
      template_clone
        .querySelector(".BEECH_notifications--image")
        .setAttribute("src", notification.image);


      // Add data to links
      const links = template_clone.querySelectorAll(".BEECH_notifications--link");
      links.forEach(link => {
        link.setAttribute("href", notification.cta_link);
      })

      const button = template_clone.querySelector(
        ".BEECH_notifications--button"
      );

      if(button) {
        button.setAttribute("href", notification.cta_link);
        button.textContent = notification.cta_text;
      }

      // Append the clone to the appriopriate wrapper.
      if(type === 'right_corner') {

        let rightWrapper = BEECH_notifications.querySelector(".BEECH_notifications--right-wrapper");

        // If the element doesn't exist create it.
        if(!rightWrapper) {
            rightWrapper = document.createElement("div");
            rightWrapper.className = 'BEECH_notifications--right-wrapper';

            BEECH_notifications.appendChild(rightWrapper);

            rightWrapper = BEECH_notifications.querySelector(
              ".BEECH_notifications--right-wrapper"
            );
        } 
        rightWrapper.appendChild(template_clone);

      } else {
        BEECH_notifications.appendChild(template_clone);
      }

      const new_notification = BEECH_notifications.querySelector(
        "[data-beech-notification-id='" + notification.ID + "']"
      );

      //console.log(new_notification);
      const delay = n * 500;

      setTimeout( () => {
        handleNotification(new_notification);
      }, delay)

      n++;
    })
  });

  function handleNotification(notification) {
    const classList = notification.classList;
    const notificationCloseBtn = notification.querySelector(
      ".BEECH_notifications--close"
    );

    if (!handleCookies(notification)) return false;

    notificationOpen(notification);

    notificationCloseBtn.addEventListener("click", function (e) {
      e.preventDefault();
      console.log('Click notification');
      notificationClose(notification);
    });
  }

  function handleCookies(notification, action = "open") {
    if (!notification) return false;

    const {
      name: cookieName,
      days,
      id: notificationId
    } = makeCookieData(notification);

    //console.log('Cookies!');
    const cookieRead = getCookie(cookieName);
    const cookieIds = cookieRead.split(",");
    const newCookieValue = [notificationId, ...cookieIds];


    if (action === "open") {
      if ( cookieIds.includes( notificationId ) ) return false;
    
      return true;
    }

    if (action === "close") {
      setCookie(cookieName, newCookieValue, days);

      return true;
    }

    return false;
  }

  function makeCookieData(notification) {
    const dataset = notification.dataset;
    const type = dataset.beechNotificationType;
    const id = dataset.beechNotificationId;
    const days = dataset.beechNotificationDays;

    //console.log(notification, dataset);

    return {
      name: `BEECH_notifications`,
      id : id,
      value: id,
      days,
    };
  }

  function notificationOpen(notification) {
    const type = notification.dataset.beechNotificationType;

    if (type === "popup") {
      const dialog = notification.querySelector("dialog");
      dialog.showModal();
    }

    setTimeout(() => {
      notification.classList.add("BEECH__opening");

      setTimeout(() => {
        notification.classList.add("BEECH__open");
        notification.classList.remove("BEECH__opening");

      }, 25);
    }, 1000);
  }

  function notificationClose(notification) {
    const type = notification.dataset.beechNotificationType;


    setTimeout(() => {
      notification.classList.add("BEECH__closing");

      setTimeout(() => {
        notification.classList.remove("BEECH__open");
        notification.classList.remove("BEECH__closing");

        
        if (type === "popup") {
          const dialog = notification.querySelector("dialog");
          dialog.close();
        }

        notification.remove();
      }, 1000);
    }, 100);

    handleCookies(notification, "close");
  }

  /* Thank you W3 Schools */
  function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  
})();


