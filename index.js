window.onload = function() {

  const firebaseConfig = {
    apiKey: "AIzaSyAlMwvf-YIEVhXP5pm-Sx0snbNPye2L2uw",
    authDomain: "one-million-msg.firebaseapp.com",
    databaseURL: "https://one-million-msg-default-rtdb.firebaseio.com",
    projectId: "one-million-msg",
    storageBucket: "one-million-msg.appspot.com",
    messagingSenderId: "1008883466146",
    appId: "1:1008883466146:web:0949b2086b69125c69fcfb",
    measurementId: "G-VL7FHG61JR"
  };
    firebase.initializeApp(firebaseConfig);
    var mydatabase = firebase.database()

    class Heartcard{

      hc(){
        this.header()
        this.heartboard()
      }
      header(){
        var header_container = document.createElement('div')
        header_container.setAttribute('id', 'header_container')
        var header_inner_container = document.createElement('div')
        header_inner_container.setAttribute('id', 'header_inner_container')
  
        var header = document.createElement('h1')
        header.setAttribute('id', 'header')
        header.innerHTML = `1 MILLION MESSAGES`

        var description = document.createElement('h2')
        description.setAttribute('id', 'description')
        description.innerHTML = 'Write a  short message to someone and invite them to see the message.'

        var message_id_container = document.createElement('div')
        message_id_container.setAttribute('class', 'message_id_container')

        var message_id = document.createElement('span')
        message_id.setAttribute('id', 'message_id')

        var message_id_text = document.createElement('i')
        message_id_text.setAttribute('id', 'message_id_text')
        message_id_text.textContent = 'Your message ID: '

        var message_id_no = document.createElement('a')
        message_id_no.setAttribute('id', 'message_id_no')
        message_id_no.setAttribute('href', `#hc${this.get_heartcard_num()}`)
        message_id_no.innerHTML = `${this.get_heartcard_num()}/1,000,000`
  
        message_id.append(message_id_text, message_id_no)
        message_id_container.append(message_id)
        header_inner_container.append(header, description, message_id_container)
        header_container.append(header_inner_container)
        document.body.append(header_container)
      }
     
      heartboard(){
        var parent = this;
  
        var heartboard = document.createElement('div')
        heartboard.setAttribute('id', 'heartboard')
  
        var heartboard_inner_container = document.createElement('div')
        heartboard_inner_container.setAttribute('id', 'heartboard_inner_container')
  
        var heartcards = document.createElement('div')
        heartcards.setAttribute('id', 'heartcards')

        var create_heartcard_btn_container = document.createElement('div')
        create_heartcard_btn_container.setAttribute('class','create_heartcard_btn_container')

        var create_heartcard_btn = document.createElement('button')
        create_heartcard_btn.setAttribute('class','create_heartcard_btn')
        create_heartcard_btn.textContent = 'Write a message'
        create_heartcard_btn.onclick = function()
        {
        heartboard_inner_container.remove()
        parent.create_heartcard()
        }

        create_heartcard_btn_container.append(create_heartcard_btn)
        heartboard_inner_container.append(heartcards,create_heartcard_btn_container)
        heartboard.append(heartboard_inner_container)
        document.body.append(heartboard)
       parent.refresh_heartboard()
      }

      save_heartcard_num(index){
        localStorage.setItem('heartcard_num', index)
      }
      submit_heartcard(to, message, from, time_and_date){
        var parent = this
  
        mydatabase.ref('cards/').once('value', function(hc_record) {
          var index = parseFloat(hc_record.numChildren()) + 1
          var to = create_heartcard_to.value
          var from = create_heartcard_from.value

          let UTC_diff = new Date().getTimezoneOffset() + " UTC";
          let year = new Date().getFullYear();
          let month = new Date().getMonth() + 1;
          let day = new Date().getDate();
          let hours = new Date().getHours();
          let minutes = new Date().getMinutes();
          let seconds = new Date().getSeconds();
          var time_and_date = seconds+':'+minutes+':'+hours+' '+day+'/'+month+'/'+year+' '+ UTC_diff;

          mydatabase.ref('cards/' + `hc_${index}`).set({
            index: index,
            to: to,
            message: message,
            from: from,
            time_and_date: time_and_date
          })
          .then(function(){
            parent.save_heartcard_num(index)
            parent.refresh_heartboard()
          })
        })
      }
      get_heartcard_num(){
        if(localStorage.getItem('heartcard_num') != null){
          return localStorage.getItem('heartcard_num')
        }else{
          this.hc()
          return null
        }
      }

      create_heartcard()
      {
        parent = this;

        var create_heartcard_container = document.createElement('div')
        create_heartcard_container.setAttribute('id','create_heartcard_container')
        
        var create_message_container = document.createElement('div')
        create_message_container.setAttribute('class', 'create_message_container')

        var create_message_inner_container = document.createElement('div')
        create_message_inner_container.setAttribute('class', 'create_message_inner_container')


        var heart_upright_container = document.createElement('div')
        heart_upright_container.setAttribute('class', 'heart_upright_container')

        var heart_upright_inner_container = document.createElement('img')
        heart_upright_inner_container.setAttribute('class', 'heart_upright_inner_container')
        heart_upright_inner_container.setAttribute('src', './assets/heart-upright.png')
        
        var heart_upsidedown_container = document.createElement('div')
        heart_upsidedown_container.setAttribute('class', 'heart_upsidedown_container')

        var heart_upsidedown_inner_container = document.createElement('img')
        heart_upsidedown_inner_container.setAttribute('class', 'heart_upsidedown_inner_container')
        heart_upsidedown_inner_container.setAttribute('src', './assets/heart-upsidedown.png')

        var create_heartcard_to = document.createElement('input')
        create_heartcard_to.setAttribute('id', 'create_heartcard_to')
        create_heartcard_to.setAttribute('maxlength', 20)
        create_heartcard_to.placeholder = 'to'

        var message_to_container = document.createElement('div')
        message_to_container.setAttribute('class', 'message_to_container')

        var message_to_char_count_container = document.createElement('div')
        message_to_char_count_container.setAttribute('id', 'message_to_char_count_container')

        var message_to_char_count = document.createElement('p')
        message_to_char_count.setAttribute('id','message_to_char_count')
        message_to_char_count.innerHTML = '0'
        create_heartcard_to.onkeyup = function(){
          var maxLength = 20;
          var strLength = create_heartcard_to.value.length;
          
          if(strLength > maxLength-1){
              document.getElementById("message_to_char_count").innerHTML = '<span style="color: red;">'+strLength+'/'+maxLength+'</span>';
          }else{
              document.getElementById("message_to_char_count").innerHTML = strLength+'/'+maxLength;
          }
        }
        var create_heartcard_from = document.createElement('input')
        create_heartcard_from.setAttribute('id', 'create_heartcard_from')
        create_heartcard_from.setAttribute('maxlength', 20)
        create_heartcard_from.placeholder = 'from'

        var message_from_container = document.createElement('div')
        message_from_container.setAttribute('class', 'message_from_container')

        var message_from_char_count_container = document.createElement('div')
        message_from_char_count_container.setAttribute('id', 'message_from_char_count_container')

        var message_from_char_count = document.createElement('p')
        message_from_char_count.setAttribute('id','message_from_char_count')
        message_from_char_count.innerHTML = '0'
        create_heartcard_from.onkeyup = function(){
          var maxLength = 20;
          var strLength = create_heartcard_from.value.length;
          
          if(strLength > maxLength-1){
              document.getElementById("message_from_char_count").innerHTML = '<span style="color: red;">'+strLength+'/'+maxLength+'</span>';
          }else{
              document.getElementById("message_from_char_count").innerHTML = strLength+'/'+maxLength;
          }
        }


        var message_content_container = document.createElement('div')
        message_content_container.setAttribute('class', 'message_content_container')

        var create_message_content = document.createElement('textarea')
        create_message_content.setAttribute('id', 'create_message_content')
        create_message_content.setAttribute('maxlength', 100)
        create_message_content.placeholder = 'short message...'

        var message_char_count_container = document.createElement('div')
        message_char_count_container.setAttribute('id', 'message_char_count_container')

        var message_char_count = document.createElement('p')
        message_char_count.setAttribute('id','message_char_count')
        message_char_count.innerHTML = '0'
        create_message_content.onkeyup = function(){
          var maxLength = 100;
          var strLength = create_message_content.value.length;
          
          if(strLength > maxLength-1){
              document.getElementById("message_char_count").innerHTML = '<span style="color: red;">'+strLength+'/'+maxLength+'</span>';
          }else{
              document.getElementById("message_char_count").innerHTML = strLength+'/'+maxLength;
          }
        }


        var create_heartcard_button_container = document.createElement('div')
        create_heartcard_button_container.setAttribute('id', 'create_heartcard_button_container')
  
        var create_heartcard_button = document.createElement('button')
        create_heartcard_button.setAttribute('id', 'create_heartcard_button')
        create_heartcard_button.innerHTML = 'Post Message'
        create_heartcard_button.onclick = function(){
          parent.submit_heartcard(create_heartcard_to.value, create_message_content.value, create_heartcard_from.value)
          create_heartcard_container.remove()
          parent.heartboard()

        }

        var see_all_heartcards_button = document.createElement('button')
        see_all_heartcards_button.setAttribute('id', 'see_all_heartcards_button')
        see_all_heartcards_button.innerHTML = 'See all messages'
        see_all_heartcards_button.onclick = function(){
          create_heartcard_container.remove()
          parent.heartboard()

        }
       
        
        heart_upright_container.append(heart_upright_inner_container)
        message_from_container.append(create_heartcard_from)
        message_from_char_count_container.append(message_from_char_count)       
        message_to_container.append(create_heartcard_to)
        message_to_char_count_container.append(message_to_char_count)
        message_content_container.append(create_message_content)
        message_char_count_container.append(message_char_count)
        heart_upsidedown_container.append(heart_upsidedown_inner_container)
        create_heartcard_button_container.append(create_heartcard_button, see_all_heartcards_button)
        create_message_inner_container.append(heart_upright_container, message_to_container, message_to_char_count_container, message_content_container, message_char_count_container, message_from_container, message_from_char_count_container, heart_upsidedown_container, create_heartcard_button_container)
        create_message_container.append(create_message_inner_container)
        create_heartcard_container.append(create_message_container)

        document.body.append(create_heartcard_container)

      }
      refresh_heartboard(){
        var heartcards = document.getElementById('heartcards')
  
        mydatabase.ref('cards/').on('value', function(hc_records) {
          heartcards.innerHTML = ''
          if(hc_records.numChildren() == 0){
            return
          }
  
  
          var messages = Object.values(hc_records.val());
          var guide = [] 
          var unordered = [] 
          var ordered = [] 
  
          for (var i, i = 0; i < messages.length; i++) {
            guide.push(i+1)
            unordered.push([messages[i], messages[i].index]);
          }

          guide.forEach(function(key) {
            var found = false
            unordered = unordered.filter(function(item) {
              if(!found && item[1] == key) {
                ordered.push(item[0])
                found = true
                return false
              }else{
                return true
              }
            })
          })
  
          ordered.forEach(function(data) {
            var index = data.index
            var name = data.name
            var message = data.message
            var to = data.to
            var from = data.from

            var heartcard_anchor_tag = document.createElement('a')
            var heartcard_anchor_id = "hc";
            heartcard_anchor_tag.setAttribute('id', heartcard_anchor_id + (index));



            var heartcard_number = document.createElement('p')
            heartcard_number.setAttribute('class', 'heartcard_number')
            heartcard_number.innerHTML = `<i class='label'>Message ID: </i>${index} <i>/1,000,000</i>`

            var heartcard_number_container = document.createElement('div')
            heartcard_number_container.setAttribute('class', 'heartcard_number_container')

            var heartcard = document.createElement('div')
            heartcard.setAttribute('class', 'heartcard')
  
            var heartcard_inner_container = document.createElement('div')
            heartcard_inner_container.setAttribute('class', 'heartcard_inner_container')
  
            var message_to = document.createElement('p')
            message_to.setAttribute('class', 'message_to')
            message_to.innerHTML = `<i class='label'>to:</i>${to}`

            var message_to_container = document.createElement('div')
            message_to_container.setAttribute('class', 'message_to_container')

            var message_from = document.createElement('p')
            message_from.setAttribute('class', 'message_from')
            message_from.innerHTML = `<i class='label'>from:</i>${from}`

            var message_from_container = document.createElement('div')
            message_from_container.setAttribute('class', 'message_from_container')

            var hr = document.createElement('hr')
            hr.setAttribute('class', 'hr')

            var message_share = document.createElement('i')
            message_share.setAttribute('id', 'message_share' + (index))
            message_share.innerHTML = '<img src="./assets/Share.png" alt="copy link">'
            message_share.onclick = function(){
            message_share.style.display="none";
            message_social_container.style.display="flex";

            }

            var message_share_container = document.createElement('div')
            message_share_container.setAttribute('class', 'message_share_container')

            var message_social_container = document.createElement('div')
            message_social_container.setAttribute('id','message_social_container')
            message_social_container.style.display = 'none';



            var facebook_icon = document.createElement('a')
            facebook_icon.setAttribute('class', 'social facebook_icon')
            facebook_icon.setAttribute('target', 'blank')
            facebook_icon.setAttribute('href', 'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fone-million-msg.web.app%2F%23'+heartcard_anchor_id + (index)+'&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore')
            facebook_icon.innerHTML = '<img src="assets/facebook.png" alt="share with facebook">'

            var twitter_icon = document.createElement('a')
            twitter_icon.setAttribute('class', 'social twitter_icon')
            twitter_icon.setAttribute('target', 'blank')
            twitter_icon.setAttribute('href', 'https://twitter.com/intent/tweet?url=https%3A%2F%2Fone-million-msg.web.app%23hc'+index+'&text=check%20out%20what%20I%20wrote%20to%20you%20on%20one%2Dmillion%2Dmsg%20Number%20'+index)
            twitter_icon.innerHTML = '<img src="./assets/twitter.png" alt="share with twitter">'

            var whatsapp_icon = document.createElement('a')
            whatsapp_icon.setAttribute('class', 'social whatsapp_icon')
            whatsapp_icon.setAttribute('target', 'blank')
            whatsapp_icon.setAttribute('data-action', 'share/whatsapp/share')
            whatsapp_icon.setAttribute('href', 'https://wa.me/?text=check%20out%20what%20I%20wrote%20to%20you%20on%20one%2Dmillion%2Dmsg%20Number%20'+index+'.%20https://one-million-msg.web.app%23hc'+index)
            whatsapp_icon.innerHTML = '<img src="./assets/whatsapp.png" alt="share with whatsapp">'


            var telegram_icon = document.createElement('a')
            telegram_icon.setAttribute('class', 'social telegram_icon')
            telegram_icon.setAttribute('target', 'blank')
            telegram_icon.setAttribute('href', 'https://t.me/share/url?url=https://one-million-msg.web.app%23hc'+index+'&text=check out what i wrote to you on one-million-msg Number %23'+'.'+index)
            telegram_icon.innerHTML = '<img src="./assets/telegram.png" alt="share with telegram">'

            var copy_link_icon = document.createElement('i')
            copy_link_icon.setAttribute('class', 'social copy_link_icon')
            copy_link_icon.innerHTML = '<img src="./assets/link.png" alt="copy link">'
            copy_link_icon.onclick = function(){
              let hc_link = `https://one-million-msg.web.app#hc${index}`
              let hc_link_text = `Check out what i wrote to you on one-million-msg number ${index}. https://heartcard.app#hc${index}`
              navigator.clipboard.writeText(hc_link_text);
              alert("one-million-msg link copied: " + hc_link);

            }


            var message_user = document.createElement('p')
            message_user.setAttribute('class', 'message_user')
            message_user.textContent = `${name}`
  
            var message_content_container = document.createElement('div')
            message_content_container.setAttribute('class', 'message_content_container')
  
            var message_content = document.createElement('p')
            message_content.setAttribute('class', 'message_content')
            message_content.textContent = `${message}`

           
            heartcard_anchor_tag.append(heartcard_number)
            heartcard_number_container.append(heartcard_anchor_tag)
            // heart_upright_container.append(heart_upright_inner_container)
            message_from_container.append(message_from)            
            message_to_container.append(message_to)
            message_content_container.append(message_content)
            // heart_upsidedown_container.append(heart_upsidedown_inner_container)
            message_social_container.append(facebook_icon, twitter_icon, whatsapp_icon, telegram_icon, copy_link_icon)
            message_share_container.append(message_share, message_social_container)
            heartcard_inner_container.append(/*heart_upright_container,*/ message_to_container, message_content_container, message_from_container/*, heart_upsidedown_container*/)
            heartcard.append( heartcard_number_container, heartcard_inner_container, hr, message_share_container )
  
            heartcards.append(heartcard)
          });
          window.scrollTo(0,9999);

      })
  
      }
    }
    var app = new Heartcard()
    app.hc()
  }
  