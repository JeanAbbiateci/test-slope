    labelwidth = 160;
    numberwidth = 0;
    width = 740;
    height = 600;
    hi_color = "#5E90B1";
    hi_mid_color = "#97b7cd";
    hi_low_color = "#d0dfe8";
    lo_high_color = "#fedcc0";
    lo_mid_color = "#feb77d";
    lo_low_color = "#CF5E02";



    var types = ["menu1", "menu2", "menu3", "menu4", "menu5", "menu6"];
    var obj = jQuery.parseJSON('{"Johnson & Johnson":{"annee2012":{"menu4":1720080.5,"menu5":3193124.3,"menu2":0,"menu1":16480925.0,"menu6":0,"menu3":5515932.05},"annee2011":{"menu4":1352098.46,"menu5":3434390.23,"menu2":0,"menu1":14082875.0,"menu6":0,"menu3":4406158.91}},"ViiV":{"annee2012":{"menu4":32941.03,"menu5":51300.0,"menu2":10414491.17,"menu1":2050950.0,"menu6":0,"menu3":47107.39},"annee2011":{"menu4":0,"menu5":228135.0,"menu2":5700680.6,"menu1":2891383.0,"menu6":0,"menu3":0}},"GlaxoSmithKline":{"annee2012":{"menu4":337793.78,"menu5":3204099.9,"menu2":84456496.0,"menu1":9263088.12,"menu6":0,"menu3":694870.7},"annee2011":{"menu4":0,"menu5":4285289.0,"menu2":92565085.57,"menu1":24070691.0,"menu6":0,"menu3":0}},"Valeant":{"annee2012":{"menu4":0,"menu5":882.0,"menu2":0,"menu1":0,"menu6":0,"menu3":47105.0},"annee2011":{"menu4":241.27,"menu5":602943.35,"menu2":0,"menu1":17950.0,"menu6":1004.0,"menu3":2622297.5}},"Pfizer":{"annee2012":{"menu4":2789386.0,"menu5":8778853.0,"menu2":144181774.0,"menu1":8292310.0,"menu6":901268.0,"menu3":7874999.0},"annee2011":{"menu4":4812678.0,"menu5":9631531.0,"menu2":144618409.0,"menu1":21814137.0,"menu6":1334027.0,"menu3":12911269.0}},"Merck":{"annee2012":{"menu4":0,"menu5":7472798.3,"menu2":184081045.24,"menu1":19412036.3,"menu6":2137134.27,"menu3":0},"annee2011":{"menu4":0,"menu5":0,"menu2":0,"menu1":27115970.0,"menu6":0,"menu3":0}},"AstraZeneca":{"annee2012":{"menu4":2478093.0,"menu5":1278510.0,"menu2":99428773.0,"menu1":17324488.0,"menu6":302790.0,"menu3":8510096.0},"annee2011":{"menu4":1620145.0,"menu5":1301632.0,"menu2":86304948.0,"menu1":17647700.0,"menu6":1272865.0,"menu3":6153049.0}},"Cephalon":{"annee2012":{"menu4":941490.08,"menu5":3675581.45,"menu2":17780049.66,"menu1":3216700.0,"menu6":266575.58,"menu3":1855558.43},"annee2011":{"menu4":1033595.33,"menu5":1010100.75,"menu2":24045803.39,"menu1":3599050.0,"menu6":175120.47,"menu3":1605865.18}},"EMD Serono":{"annee2012":{"menu4":319606.0,"menu5":673721.0,"menu2":0,"menu1":992335.0,"menu6":10758.0,"menu3":539142.0},"annee2011":{"menu4":107136.0,"menu5":563176.0,"menu2":0,"menu1":329763.0,"menu6":27046.0,"menu3":818027.0}},"Eli Lilly":{"annee2012":{"menu4":3924273.0,"menu5":2359544.0,"menu2":181508042.0,"menu1":21644204.0,"menu6":0,"menu3":7362864.0},"annee2011":{"menu4":8236286.0,"menu5":7499129.0,"menu2":149973132.0,"menu1":47935583.0,"menu6":0,"menu3":11548929.0}}}');
    var sorted_cat = {
        "menu2": [],
        "menu5": [],
        "menu6": [],
        "menu1": [],
        "menu3": [],
        "menu4": []
    };

    function get_y(array, number) {
        var max = array[0];
        var min = array[array.length - 1]
        var scale = (height - 156) / (max - min);
        var y = (height - 100) - scale * (number - min);
        return Math.ceil(y)
    }
    var boundingBoxes = {
        "menu2": [],
        "menu5": [],
        "menu6": [],
        "menu1": [],
        "menu3": [],
        "menu4": []
    };

    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function millions_or_thousands(number) {
        Math.round(number);
        if (number % 1000000 == number) return "thousands";
        return "millions";
    }

    function style_number(number) {
        var numbers = {
            1: "one",
            2: "two",
            3: "three",
            4: "four",
            5: "five",
            6: "six",
            7: "seven",
            8: "eight",
            9: "nine",
            10: "ten"
        };
        if (number < 10) return numbers[number];
        return number;
    }

    function abs_number(number) {
        if (number < 0) return number * (-1);
        return number
    }

    function inc_or_dec(number) {
        if (number < 0) return "decreased";
        return "increased"
    }

    function get_change(data, category) {
        var newnumber = 0;
        _.map(_.keys(data), function(e) {
            if (data[e]['annee2012'][category] > 0 && data[e]['annee2011'][category] > 0) {
                newnumber += data[e]['annee2012'][category];
            };
        });
        var oldnumber = 0;
        _.map(_.keys(data), function(e) {
            if (data[e]['annee2012'][category] > 0 && data[e]['annee2011'][category] > 0) {
                oldnumber += data[e]['annee2011'][category];
            };
        });
        var change = Math.round((((newnumber - oldnumber) / oldnumber) * 100) * 10) / 10;
        return change
    }

    function count_companies(data, category) {
        var count = 0;
        _.map(_.keys(data), function(e) {
            if (data[e]['annee2011'][category] != 0 && data[e]['annee2012'][category] != 0) count++;
        });
        return count;
    }

    function percent_change(newnum, oldnum) {
        var percent = ((newnum - oldnum) / oldnum) * 100;
        return percent;
    }

    function build_header(data, categories) {
        var header = []
        _.each(categories, function(category) {
            var change = get_change(data, category)
            var count = count_companies(data, category)
            header.push([category, change, count])

        });
        return header;
    }

    function get_color(number) {
        if (number < 300000000 && number > 10000000) {
            return hi_color;
        } else if (number > 1000000) {
            return hi_mid_color;
        } else if (number > 0) {
            return hi_low_color;
        } else if (number > (-1000000)) {
            return lo_high_color;
        } else if (number > (-10000000)) {
            return lo_mid_color;
        } else {
            return lo_low_color;
        }
    }

    function shrink_number(number) {
        Math.round(number)
        if (millions_or_thousands(number) == "thousands") return [Math.round((number / 1000) * 10) / 10, "K"];
        return [Math.round((number / 1000000) * 10) / 10, "M"];
    }

    function collides(box, type) {
        for (var i = 0, il = boundingBoxes[type].length; i < il; i++) {
            var seen = boundingBoxes[type][i];
            if (!(box.x > seen.x + seen.w || box.y > seen.y + seen.h || box.x + box.w < seen.x || box.y + box.h < seen.y)) return true;
        }
        boundingBoxes[type].push(box);
        return false;
    }

    function build_dataset(json, categories) {
        var dataset = [];
        _.map(_.keys(json), function(company) {
            var hash = {};
            hash['company'] = company;
            hash.coordinates = {};
            hash.labels = {};
            _.each(categories, function(category) {
                if (json[company]['annee2011'][category] == 0 || json[company]['annee2012'][category] == 0) {
                    return;
                } else {
                    startY = good_ys[category][json[company]['annee2011'][category]];
                    endY = good_ys[category][json[company]['annee2012'][category]];
                    hash['coordinates'][category] = ["M", labelwidth + numberwidth + 5, " ", startY, "L", width - labelwidth - numberwidth - 5, " ", endY].join("");
                    hash['labels'][category] = [shrink_number(json[company]['annee2011'][category]).join(""), startY, shrink_number(json[company]['annee2012'][category]).join(""), endY];
                }
            });
            dataset.push(hash);
        });
        return dataset
    }


    var good_ys = {
        "menu2": {},
        "menu5": {},
        "menu6": {},
        "menu1": {},
        "menu3": {},
        "menu4": {}
    }
    var info = {
        "menu1": {},
        "menu2": {},
        "menu5": {},
        "menu6": {},
        "menu3": {},
        "menu4": {}
    }

    _.each(types, function(type) {
        _.each(obj, function(company) {
            if (company["annee2011"][type] != 0) {
                sorted_cat[type].push(company["annee2011"][type]);
            }
            if (company["annee2012"][type] != 0) {
                sorted_cat[type].push(company["annee2012"][type]);
            }
        });
        sorted_cat[type] = _.sortBy(sorted_cat[type], function(num) {
            return -num
        });
        _.each(sorted_cat[type], function(i) {
            var startY = get_y(sorted_cat[type], i);
            while (collides({
                x: 0,
                y: startY,
                w: labelwidth,
                h: 18
            }, type)) {
                startY++;
            }
            good_ys[type][i] = startY;
        });
    });

    var DATA = build_dataset(obj, types);
    var hed = build_header(obj, types);









    $(function() {
        if ($(window).width() > 480) {
            $('#slope-text').html('Click a category to see how spending changed.');
            draw_slopegraph();
        } else {
            $('#slope-text').html('Scroll down to see how spending changed.');
            draw_tables();
        }

        function draw_slopegraph() {
            var paper = Raphael("slopegraph", width, height);
            t = paper.text(labelwidth, 14, '2011').attr({
                'text-anchor': 'end',
                'font-family': 'Georgia',
                'text-decoration':'overline',
                'font-size': '35',
                'font-weight': 'bold',
                'font-color':'#ffffff'
            })
            t = paper.text(width - labelwidth, 14, '2012').attr({
                'text-anchor': 'start',
                'font-family': 'Georgia',
                'font-size': '35',
               
                'font-weight': 'bold'
            })
            var html = "";
            _.each(hed, function(h) {
                if (h[0] == "menu6") {
                    var cat = "menu6";
                } else {
                    var cat = h[0]
                }
                html += "<div class='menu-wrapper'><div class='chooser' data-category='" + h[0] + "'>" + capitalize(cat) + "</div></div>";

            });

            $("#header").html(html);


            var animspeed = 500;

            var Company = function(coordinates, name, labels) {
                this.name = name;
                this.coords = coordinates;
                this.labels = labels;
                if ("menu1" in this.coords) {
                    this.path = paper.path(this.coords.menu1).attr({
                        'class': this.name,
                        opacity: 0
                    });
                    this.leftcompany = paper.text(labelwidth, this.labels.menu1[1], this.name + " $" + this.labels.menu1[0]).attr({
                        'text-anchor': 'end',
                        'font-size': '14px',
                        'font-family': 'georgia',
                        'font-weight': 'normal',
                        opacity: 0
                    });
                    this.rightcompany = paper.text(width - labelwidth, this.labels.menu1[3], "$" + this.labels.menu1[2] + " " + this.name).attr({
                        'text-anchor': 'start',
                        'font-size': '14px',
                        'font-family': 'Georgia',
                        'font-weight': 'normal',
                        opacity: 0
                    });
                    this.path.animate({
                        opacity: 1
                    }, animspeed);
                    this.leftcompany.animate({
                        opacity: 1
                    }, animspeed);
                    this.rightcompany.animate({
                        opacity: 1
                    }, animspeed);
                };

            };



            Company.prototype.draw = function(key) {
                if (key in this.coords) {
                    if (this.path == undefined) {
                        console.log(this.coords[key]);
                        this.path = paper.path(this.coords[key]).attr({
                            opacity: 0
                        });
                        this.leftcompany = paper.text(labelwidth, this.labels[key][1], this.name + " $" + this.labels[key][0]).attr({
                            'text-anchor': 'end',
                            'font-size': '14px',
                            'font-family': 'Georgia',
                            'font-weight': 'normal'
                        }).attr({
                            opacity: 0
                        });
                        this.rightcompany = paper.text(width - labelwidth, this.labels[key][3], "$" + this.labels[key][2] + " " + this.name).attr({
                            'text-anchor': 'start',
                            'font-size': '14px',
                            'font-family': 'Georgia',
                            'font-weight': 'normal'
                        }).attr({
                            opacity: 0
                        });
                        this.path.animate({
                            opacity: 1
                        }, animspeed);
                        this.leftcompany.animate({
                            opacity: 1
                        }, animspeed);
                        this.rightcompany.animate({
                            opacity: 1
                        }, animspeed);
                    } else {
                        this.path.animate({
                            path: this.coords[key],
                            opacity: 1
                        }, animspeed);
                        this.leftcompany.animate({
                            x: labelwidth,
                            y: this.labels[key][1],
                            opacity: 1
                        }, animspeed).attr('text', this.name + " $" + this.labels[key][0]);
                        this.rightcompany.animate({
                            x: width - labelwidth,
                            y: this.labels[key][3],
                            opacity: 1
                        }, animspeed).attr('text', "$" + this.labels[key][2] + " " + this.name);
                    };
                } else {
                    if (this.path != undefined) {
                        this.path.animate({
                            opacity: 0
                        }, animspeed);
                        this.leftcompany.animate({
                            opacity: 0
                        }, animspeed);
                        this.rightcompany.animate({
                            opacity: 0
                        }, animspeed);
                    };
                };
            };
            window.Companies = _.map(DATA, function(c) {
                return new Company(c.coordinates, c.company, c.labels);
            });

            $(".chooser").hover(function() {
                $(this).addClass("hover");
            }, function() {
                $(this).removeClass("hover");
            })

            $("div[data-category='menu1']").addClass("active");

            $(".chooser").bind("click", function(e) {
                $(".chooser").removeClass("active");
                $(this).addClass("active");
                var category = $(e.currentTarget).attr("data-category");
                _.each(Companies, function(v) {
                    v.draw(category);
                });
            });
        }

        function draw_tables() {
            $('#chart-wrapper').remove();
            $('#header').remove();
            $('#slope-wrapper').append("<div id='mobile-slope-wrapper'></div>");
            start = $('#mobile-slope-wrapper').position()['top'];


            var html = "<div id='mobile-slope-legend-wrap'><div id='mobile-slope-legend-bar'><div class='mobile-slope-bar-item' style='background-color:#CF5E02;'>&nbsp;</div><div class='mobile-slope-bar-item' style='background-color:#feb77d;'>&nbsp;</div><div class='mobile-slope-bar-item' style='background-color:#fedcc0;'>&nbsp;</div><div class='mobile-slope-bar-item' style='background-color:#d0dfe8;'>&nbsp;</div><div class='mobile-slope-bar-item' style='background-color:#97b7cd;'>&nbsp;</div><div class='mobile-slope-bar-item' style='background-color:#5E90B1;'>&nbsp;</div></div><div id='mobile-slope-legend-text'><span class='left-text'>-$30M</span><span class='left-text'>-$10M</span><span class='left-text'>-$1M</span><span class='center-text'>0</span><span class='right-text'>$1M</span><span class='right-text'>$10M</span><span class='right-text'>$30M</span></div></div><div style='clear:both'></div>";

            var companies = [];
            _.each(types, function(category) {
                _.map(_.keys(obj), function(company) {
                    companies.push(company);
                    if (obj[company]['annee2011'][category] !== 0 && obj[company]['annee2012'][category] !== 0) {
                        var oldnum = shrink_number(obj[company]['annee2011'][category]).join("");
                        var newnum = shrink_number(obj[company]['annee2012'][category]).join("");
                        var difference = obj[company]['annee2012'][category] - obj[company]['annee2011'][category];
                        info[category][company] = [oldnum, newnum, difference];
                    }
                });
            });
            var sorted_comps = _.uniq(companies.sort());
            console.log(sorted_comps);
            _.each(hed, function(h) {
                if (h[0] == "menu6") {
                    var cat = "menu6";
                } else {
                    var cat = h[0];
                }
                html += "<div class='mobile-blurb'><div class='mobile-hed'><p>" + capitalize(cat) + "</p></div><div class='mobile-blurb-text'><p>Payments to health care providers for " + cat + " " + inc_or_dec(h[1]) + " by " + abs_number(h[1]) + "% among the " + style_number(h[2]) + " companies that reported for both years.</p></div></div>";
                html += "<table class='mobile-table'><tr><th class='left'></th><th class='right'>2011</th><th class='right'>2012</th><th></th></tr>";
                _.each(sorted_comps, function(comp) {
                    if (_.has(info[h[0]], comp)) {
                        if (info[h[0]][comp][2] > 0) {
                            var arrow = "up";
                        } else {
                            var arrow = "down";
                        }
                        var color = get_color(info[h[0]][comp][2]);
                        html += "<tr><td class='left'>" + comp + "</td><td class='right'>$" + info[h[0]][comp][0] + "</td><td class='right'>$" + info[h[0]][comp][1] + "</td><td class='arrow'><span class='ss-icon' style = 'color:" + color + "' >" + arrow + "</span></td></tr>";
                    }
                });
                html += "</table></div>";
            });
            $("#mobile-slope-wrapper").html(html);



        }


    });