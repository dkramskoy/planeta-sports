
 document.addEventListener('DOMContentLoaded', ()=>{

    let toggleMenus = document.querySelectorAll('.nav_center__item');
    let activeMenu = document.querySelectorAll('.nav_center .nav_center__inner');
    
    let mainContent = document.querySelector('.main-content');
    let toggleButton  = document.querySelector('.nav_toggle'); 

     if(activeMenu.length === 0) return;

     if(window.innerWidth < 770) {
         for(let menu of activeMenu) {
            menu.classList.remove('active');
         }
     }
     window.addEventListener('resize', ()=>{
         if(window.innerWidth > 770) {
            let activeMenuList = document.querySelector('ul.active');
         
             if( !activeMenuList ) {
            
                activeMenu[0].classList.add('active');
             }

             if( mainContent.classList.contains('shifted') ) {
                mainContent.classList.remove('shifted');
             }
             for(let menu of toggleMenus) {
                 if( menu.classList.contains('displayBlock') ) {
                    menu.classList.remove('displayBlock');
                 }
             }
         }
         if(window.innerWidth < 770) {
             let newActiveMenu = document.querySelector('.nav_center .nav_center__inner.active');
             if( !newActiveMenu ) return; 
             newActiveMenu.classList.remove('active');
         }
     })
     toggleButton.addEventListener('click', ()=>{
        let newActiveMenu = document.querySelector('.nav_center .nav_center__inner.active');
                mainContent.classList.toggle('shifted');
                for(let menu of toggleMenus) {
                    menu.classList.toggle('displayBlock')
                }
        if(newActiveMenu) {
            newActiveMenu.classList.remove('active');
        }
    })
 })