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
            this.$('.side_menu_programs').attr('href','/insurance/?view=linegraph');
            this.$('.side_menu_fooddiary').attr('href','/insurance/?view=bargraph');
            this.$('.side_menu_forums').attr('href','/insurance/?view=table');
            this.$('.side_menu_surveys').attr('href','/insurance/?view=map');
            this.$('.accountSettings').attr('href','/insurance/?view=account');
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

