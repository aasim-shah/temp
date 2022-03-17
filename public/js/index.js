$( document ).ready(function() {
    $('#search_btn').on('click' , ()=> {
        $('#searchPopUp').addClass('active')
        $('#overlay').css({display : 'block'})
    })
    $('#hidesearchPopup').on('click' , ()=> {
        $('#searchPopUp').removeClass('active')
        $('#overlay').css({display : 'none'})
    })
});