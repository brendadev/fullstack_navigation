define([
    'jquery',
    'underscore',
    'backbone',
    'moment',
    'text!templates/side.menu.template.html'
], function(
    $,_,Backbone,Moment,
    //DeviceConnectionModel,
    Template
    ){
    var MenuView = Backbone.View.extend({
        template:_.template(Template),
        events:function() {
            var base = {

            };
            if (window.utils.isTouch()) {
                var click = {
                    'touchstart .connectDevices'    : 'connectDevices',
                    'touchstart .userMenu'          : 'showMenu'
                };
            } else {
                var click = {
                    'click .userMenu'                   : 'showMenu',
                    'mouseleave .userDropDown'          : 'hideMenu'
                };
            }
            $.extend(base,click);
            return base;
        },
        initialize: function(options) {
            this.debugName = 'side menu view';
        },
        render: function() {
            $(this.el).html(this.template());
            this.$('.indSideMenu').show();
            this.$('.side_menu_programs').attr('href','/insurance/?v=program1');
            this.$('.side_menu_fooddiary').attr('href','/insurance/?v=program2');
            //this.resetMenu();
            return this;
        },
        hideMenu:function() {
            //this.resetMenu();
            this.$('.userMenu').removeClass('active');
            this.$('.userMenuDropDown').slideUp();
            this.$('.toggleUserMenu').removeClass('fa-chevron-up').addClass('fa-chevron-down');
        },
        showMenu:function() {
            if (this.$('.userMenuDropDown').css('display')=='none') {
                this.$('.mainMenu .sideMenuItem').removeClass('active');
                this.$('.userMenu').addClass('active');
                this.$('.toggleUserMenu').removeClass('fa-chevron-down').addClass('fa-chevron-up');
                this.$('.userMenuDropDown').fadeIn();
            } else {
                this.hideMenu();
            }
        }
    });
    return MenuView;
});

