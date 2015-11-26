define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/table.view.template.html'
], function(
    $,_,Backbone,Template
){
    var StateTableView = Backbone.View.extend({
        className: 'row border_top_gray',
        template:_.template(Template),
        initialize: function(options) {
            this.debugName = 'states table view';
            this.bind('sync',this.procStatesData,this);
            this.fetch({cache: false});
        },
        render: function() {
            $(this.el).html(this.template());
            return this;
        },
        procStatesData:function() {
            var frag = document.createDocumentFragment();
            _.each(this.columns,function(c){
                var d = document.createElement('div');
                d.className = 'span' + this.columns.length + 'col rowCellHeader left';
                d.innerHTML= c.displayName;
                this.$('.rowHeadings').append(d);
            },this);
            //
            //    _.each(this.columns,function(c){
            //        var d = document.createElement('div');
            //        d.className = 'span' + this.columns.length + 'col rowCellHeader left koneksa_mid_gray';
            //        d.innerHTML= c.units.length > 0 ? '(' + c.units + ')' : '';
            //        this.$('.rowUnits').append(d);
            //    },this);
            //    this.$('.participantList').empty();
            //    if (this.subviews.length > 0) {
            //        _.each(this.subviews,function(sv){
            //            window.utils.cleanView(sv);
            //        });
            //    }
            //    var reqProf = {
            //        userId: this.profile.get('userId'),
            //        userType: this.profile.get('userType')
            //    }
            //    this.participants.each(function(p){
            //        var nLearning,nSurveysDone;
            //        if (this.org.get('entitlements').orgHasGoals) {
            //            var goals = new GoalsCollection(this.participantGoals.where({userId:p.get('userId')}));
            //        }
            //        if (this.org.get('entitlements').orgHasLearning) {
            //            nLearning = this.learningStatus.find(function(user){
            //                return  p.get('userId') === user.get('userId');
            //            });
            //            nLearning = nLearning.get('completed');
            //        } else {
            //            nLearning = 0;
            //        }
            //        if (this.org.get('entitlements').orgHasGoals) {
            //            nSurveysDone = this.surveystats.find(function(user){
            //                return  p.get('userId') === user.get('userId');
            //            });
            //            nSurveysDone = (typeof nSurveysDone == 'undefined') ? 0 : nSurveysDone.get('count');
            //        } else {
            //            nSurveysDone = 0;
            //        }
            //
            //        if (typeof this.participantIds != 'undefined') {
            //            if (this.participantIds.length > 0) {
            //
            //                var u = this.participantIds.find(function(user){
            //                    return  p.get('userId') === user.get('userId');
            //                });
            //
            //
            //                if (u != null) {
            //                    var smv = new ParticipantStatusView(
            //                        {
            //                            surveysDone             : nSurveysDone,
            //                            org                     : this.org,
            //                            startWeek               : this.startWeek,
            //                            endWeek                 : this.endWeek,
            //                            model                   : p,
            //                            user                    : u,
            //                            reqProf                 : reqProf,
            //                            columns                 : this.columns,
            //                            progId                  : this.progId,
            //                            weekBegins              : this.program.get('weekBegins'),
            //                            surveysDue              : this.surveysDue,
            //                            goals                   : goals,
            //                            days                    : this.days,
            //                            startDate               : this.program.get('startDate'),
            //                            endDate                 : this.program.get('endDate'),
            //                            conditionId             : this.program.get('conditionId')
            //                        }
            //                    );
            //                } else {
            //                    var smv = new ParticipantStatusView(
            //                        {
            //                            surveysDone             : nSurveysDone,
            //                            org                     : this.org,
            //                            startWeek               : this.startWeek,
            //                            endWeek                 : this.endWeek,
            //                            model                   : p,reqProf:reqProf,
            //                            columns                 : this.columns,
            //                            progId                  : this.progId,
            //                            weekBegins              : this.program.get('weekBegins'),
            //                            surveysDue              : this.surveysDue,
            //                            goals                   : goals,
            //                            days                    : this.days,
            //                            startDate               : this.program.get('startDate'),
            //                            endDate                 : this.program.get('endDate'),
            //                            conditionId             : this.program.get('conditionId')
            //                        }
            //                    );
            //                }
            //            } else {
            //                var smv = new ParticipantStatusView(
            //                    {
            //                        surveysDone         : nSurveysDone,
            //                        org                 : this.org,
            //                        startWeek           : this.startWeek,
            //                        endWeek             : this.endWeek,
            //                        model               : p,
            //                        reqProf             : reqProf,
            //                        columns             : this.columns,
            //                        progId              : this.progId,
            //                        weekBegins          : this.program.get('weekBegins'),
            //                        surveysDue          : this.surveysDue,
            //                        goals               : goals,
            //                        days                : this.days,
            //                        startDate           : this.program.get('startDate'),
            //                        endDate             : this.program.get('endDate'),
            //                        conditionId         : this.program.get('conditionId')
            //                    }
            //                );
            //            }
            //        } else {
            //            var smv = new ParticipantStatusView(
            //                {
            //                    surveysDone             : nSurveysDone,
            //                    org                     : this.org,
            //                    startWeek               : this.startWeek,
            //                    endWeek                 : this.endWeek,
            //                    model                   : p,
            //                    reqProf                 : reqProf,
            //                    columns                 : this.columns,
            //                    progId                  : this.progId,
            //                    weekBegins              : this.program.get('weekBegins'),
            //                    surveysDue              : this.surveysDue,
            //                    goals                   : goals,
            //                    days                    : this.days,
            //                    startDate               : this.program.get('startDate'),
            //                    endDate                 : this.program.get('endDate'),
            //                    conditionId             : this.program.get('conditionId')
            //                }
            //            );
            //        }
            //        if (this.org.get('entitlements').orgHasLearning) {
            //            smv.courses = this.courses;
            //            smv.learningDone =nLearning;
            //        }
            //
            //        frag.appendChild(smv.render().el);
            //        this.subviews.push(smv);
            //    },this);
            //    this.$('.participantList').append(frag);
            //} else {
            //    this.$('.rowHeader').hide();
            //    if (moment().diff(moment(this.program.get('endDate')),"days")>0) {
            //        window.errorMessage.set({message:'this program is closed',alertType:'warn'});
            //    } else {
            //        $('.txtMsgDialog').hide();
            //        window.errorMessage.set({message:'this program does not yet have any participants',alertType:'warn'});
            //    }
            //
            //}
        }
    });
    return StateTableView;
});
