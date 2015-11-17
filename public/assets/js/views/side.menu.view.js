define([
    'jquery',
    'underscore',
    'backbone',
    'moment',
    //'models/deviceConnection.model',
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
                    'click .connectDevices'             : 'connectDevices',
                    'click .userMenu'                   : 'showMenu',
                    'mouseleave .userDropDown'          : 'hideMenu'
                };
            }
            $.extend(base,click);
            return base;
        },
        initialize: function(options) {
            this.debugName = 'side menu view';
            //this.profile = options.profile;
            //this.org = options.org;
            //this.active = options.active;
            //this.deviceConnection = new DeviceConnectionModel();
            //this.deviceConnection.bind('sync',this.devicesAdded,this);
            //this.profile = options.profile;
            //this.getIdentityFromPath();
            //if (this.profile.get('userType') !== 0) {
            //    var DueSurveysCounter = Backbone.Model.extend({urlRoot : '/organization/' + this.profile.get('orgId') + '/total/surveysDue'});
            //    this.dueSurveysCounter = new DueSurveysCounter();
            //    this.dueSurveysCounter.bind('sync', this.setSurveyCounter, this);
            //    window.pubSub.on('surveyCompleted', this.updateSurveyCounter, this);
            //    window.pubSub.cleanOldEvents('surveyCompleted');
            //    this.updateSurveyCounter();
            //}
            //var UnreadMessagesCounter = Backbone.Model.extend({urlRoot : '/messages/total/received/' + true + '/' + true});
            //this.unreadMsgsCounter = new UnreadMessagesCounter();
            //this.unreadMsgsCounter.bind('sync', this.setMessageCounter, this);
            //
            //window.pubSub.on('updateUserName',this.updateUserName,this);
            //window.pubSub.cleanOldEvents('updateUserName');
            //window.pubSub.on('connectDevices',this.connectDevices,this);
            //window.pubSub.cleanOldEvents('connectDevices');
            //window.pubSub.on('notificationsUpdated', this.updateMessageCounter, this);
            //window.pubSub.cleanOldEvents('notificationsUpdated');
            //
            //this.updateMessageCounter();
        },
        render: function() {
            $(this.el).html(this.template());
            //this.getIdentityFromPath();
            //this.$('.clientLogo').css('background-image','url("/assets/img/clientlogos/' + this.org.get('orgId') + '.png")')
            //this.$('.userName').html(this.profile.get('username'));
            //this.$('.userMoniker').html(this.profile.get('username').substring(0,1).toUpperCase());
            //this.$('.icon_reverse_logo').attr('href','/profile/' + this.userType + '/' + this.userId);
            //if (window.utils.getQueryStringParameter('p')!= '') {
                //this.$('.orgSideMenu').remove();
                //this.$('.side_menu_forums').remove();
                //this.$('.side_menu_messages').remove();
                //this.$('.side_menu_measurements').remove();
                //this.$('.side_menu_surveys').remove();
                //this.$('.userMenuDropDown').remove();
                //this.$('.toggleUserMenu').remove();
                //if (!this.org.get('entitlements').orgHasNutrition) {
                //    this.$('.side_menu_fooddiary').remove();
                //} else {
                //    this.$('.side_menu_fooddiary').attr('href','/food/' + this.userType + '/' + this.userId);
                //}
            //} else {
                //if (!this.org.get('entitlements').orgHasSurveys) {
                //    this.$('.side_menu_surveys').remove();
                //}
                //if (!this.org.get('entitlements').orgHasNutrition) {
                //    this.$('.side_menu_fooddiary').remove();
                //} else {
                //    this.$('.side_menu_fooddiary').attr('href','/food/' + this.userType + '/' + this.userId);
                //}
                //if (!this.org.get('entitlements').orgHasForums) {
                //    this.$('.side_menu_forums').remove();
                //} else {
                //    this.$('.side_menu_forums').attr('href','/forums/' + this.userType + '/' + this.userId);
                //}
                //if (!this.org.get('entitlements').orgHasUiNotifications) {
                //    this.$('.side_menu_messages').remove();
                //}
                //if (!this.org.get('entitlements').orgHasDataTemplates) {
                //    this.$('.side_menu_measurements').remove();
                //} else {
                //    this.$('.side_menu_measurements').attr('href','/datatemplates/' + this.userType + '/' + this.userId);
                //}
                //if (this.profile.get('userType') < 9) {
                //    this.$('.indSideMenu').hide();
                //    this.$('.orgSideMenu').show();
                //    this.$('.connectDevices').remove();
                //} else {
                    this.$('.indSideMenu').show();
                //    this.$('.orgSideMenu').hide();
                //}
            //}
            //this.$('.side_menu_programs').attr('href','/profile/' + this.userType + '/' + this.userId);
            //this.$('.side_menu_participants').attr('href','/participants/' + this.userType + '/' + this.userId);
            //this.$('.side_menu_surveys').attr('href','/surveys/' + this.userType + '/' + this.userId);
            //this.$('.side_menu_messages').attr('href','/messages/' + this.userType + '/' + this.userId);
            //this.$('.accountSettings').attr('href','/account/' + this.userType + '/' + this.userId);
            this.$('.side_menu_programs').attr('href','/');
            this.$('.side_menu_participants').attr('href','/');
            this.$('.side_menu_surveys').attr('href','/');
            this.$('.side_menu_messages').attr('href','/');
            this.$('.accountSettings').attr('href','/');
            this.resetMenu();
            return this;
        },
        setMessageCounter:function() {
            var numUnreadMessages = this.unreadMsgsCounter.attributes.data;

            var elem = $('.side_menu_messages span.badge-counter');
            if (numUnreadMessages > 0) {
                elem.show()
                elem.html(numUnreadMessages.toString());
            }
            else {
                elem.hide();
            }
        },
        updateMessageCounter:function() {
            this.unreadMsgsCounter.fetch({cache:false});
        },
        setSurveyCounter:function() {
            var numSurveysDue = this.dueSurveysCounter.attributes.data;

            var elem = $('.side_menu_surveys span.badge-counter');
            if (numSurveysDue > 0) {
                elem.show();
                elem.html(numSurveysDue.toString());
            }
            else {
                elem.hide();
            }
        },
        updateSurveyCounter:function() {
            this.dueSurveysCounter.fetch({cache:false});
        },
        getIdentityFromPath:function() {
            this.userType = this.profile.get('userType');
            this.userId = this.profile.get('userId');
        },
        resetMenu:function() {
            switch(this.active) {
                case 'profile':
                    this.$('.side_menu_programs').addClass('active');
                    break;
                case 'surveys':
                    this.$('.side_menu_surveys').addClass('active');
                    break;
                case 'participants':
                    this.$('.side_menu_participants').addClass('active');
                    break;
                case 'messages':
                    this.$('.side_menu_messages').addClass('active');
                    break;
                case 'forums':
                    this.$('.side_menu_forums').addClass('active');
                    break;
                case 'measurements':
                    this.$('.side_menu_measurements').addClass('active');
                    break;
                case 'support':
                    this.$('.side_menu_support').addClass('active');
                    break;
                case 'account':
                    this.$('.userMenuDropDown').show();
                    this.$('.accountSettings').addClass('active');
                    break;
                default:
            }
        },
        connectDevices:function() {
            var that = this;
            var opts = {};
            this.hideMenu();
            //if (this.profile.get('hasDevices')) {
            //    if (!_.isUndefined(that.profile.get('deviceConnection')[0])) {
            //        if (_.isUndefined(that.profile.get('deviceConnection')[0].publicToken)) {
            //
            //        } else {
            //            opts = {
            //                publicToken     : that.profile.get('deviceConnection')[0].publicToken,
            //                clientUserId    : window.instance + '_ ' + that.userId,
            //                close           : function() {}
            //            }
            //        }
            //    } else {
            //        opts = {
            //            clientId        : window.humanApiClientId,
            //            clientUserId    : window.instance + '_ ' +  that.userId,
            //            finish          : function(err, sessionTokenObject) {
            //                window.utils.output('HumanApi',sessionTokenObject);
            //                that.deviceConnection.set(
            //                    {
            //                        clientId        : sessionTokenObject.clientId
            //                        ,humanId        : sessionTokenObject.humanId
            //                        ,userId         : sessionTokenObject.userId
            //                        ,sessionToken   : sessionTokenObject.sessionToken
            //                    }
            //                );
            //                that.deviceConnection.save();
            //            },
            //            close: function() {
            //            }
            //        };
            //    }
            //
            //} else {
            //    opts = {
            //        clientId        : window.humanApiClientId,
            //        clientUserId    : window.instance + '_ ' +  that.userId,
            //        finish          : function(err, sessionTokenObject) {
            //            window.utils.output('HumanApi',sessionTokenObject);
            //            that.deviceConnection.set(
            //                {
            //                    clientId        : sessionTokenObject.clientId
            //                    ,humanId        : sessionTokenObject.humanId
            //                    ,userId         : sessionTokenObject.userId
            //                    ,sessionToken   : sessionTokenObject.sessionToken
            //                }
            //            );
            //            that.deviceConnection.save();
            //        },
            //        close: function() {
            //        }
            //    };
            //}
            //HumanConnect.open(opts);
        },
        devicesAdded:function() {

        },
        updateUserName:function(data) {
            this.$('.userName').html(data.username);
        },
        hideMenu:function() {
            this.resetMenu();
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

