<script>
    import * as d3 from 'd3';
    import d3Sankey from './sankey';
    import Student from '@store/classes/Student';
    d3.sankey = d3Sankey;

    export default {
        name: 'graph',
        components: {},
        props: ['filter'],
        data() {
            return {
                students: [],
                nodes: [
                    {
                        'name': 'Freshman',
                        'color': 'rgb(44, 123, 182)',
                        'color2': 'rgb(171, 217, 233)',
                        'tuition': '$20,000',
                        'age': 'Age 18'
                    },
                    {
                        'name': 'Sophomore',
                        'color': 'rgb(44, 123, 182)',
                        'color2': 'rgb(171, 217, 233)',
                        'tuition': '$40,000',
                        'age': 'Age 19'
                    },
                    {
                        'name': 'Low GPA 1',
                        'color': 'rgb(215, 25, 28)',
                        'color2': 'rgb(253, 174, 97)',
                        'tuition': '',
                        'age': 'Age 19'
                    },
                    {
                        'name': 'Junior',
                        'color': 'rgb(44, 123, 182)',
                        'color2': 'rgb(171, 217, 233)',
                        'tuition': '$60,000',
                        'age': 'Age 20'
                    },
                    {
                        'name': 'Low GPA 2',
                        'color': 'rgb(215, 25, 28)',
                        'color2': 'rgb(253, 174, 97)',
                        'tuition': '',
                        'age': 'Age 20'
                    },
                    {
                        'name': 'Senior',
                        'color': 'rgb(44, 123, 182)',
                        'color2': 'rgb(171, 217, 233)',
                        'tuition': '$80,000',
                        'age': 'Age 21'
                    },
                    {
                        'name': 'Low GPA 3',
                        'color': 'rgb(215, 25, 28)',
                        'color2': 'rgb(253, 174, 97)',
                        'tuition': '',
                        'age': 'Age 21'
                    },
                    {
                        'name': 'Fifth Year',
                        'color': 'rgb(215, 25, 28)',
                        'color2': 'rgb(253, 174, 97)',
                        'tuition': '$100,000',
                        'age': 'Age 22'
                    },
                    {
                        'name': 'Graduates',
                        'color': 'rgb(44, 123, 182)',
                        'color2': 'rgb(171, 217, 233)',
                        'tuition': '$80,000',
                        'age': 'Age 22, gets Ph.D at 29 year'
                    },
                    {
                        'name': 'Sixth Year',
                        'color': 'rgb(215, 25, 28)',
                        'color2': 'rgb(253, 174, 97)',
                        'tuition': '$120,000',
                        'age': 'Age 23, gets Ph.D at 31 year'
                    },
                    {
                        'name': 'Late Graduates',
                        'color': 'rgb(44, 123, 182)',
                        'color2': 'rgb(171, 217, 233)',
                        'tuition': '$100,000',
                        'age': 'Age 23, gets Ph.D at 30 year'
                    }
                ],
                linksSource: [
                    {'source': 'Freshman', 'target': 'Sophomore', 'value': 670},
                    {'source': 'Freshman', 'target': 'Low GPA 1', 'value': 330},
                    {'source': 'Sophomore', 'target': 'Junior', 'value': 631},
                    {'source': 'Sophomore', 'target': 'Low GPA 2', 'value': 39},
                    {'source': 'Junior', 'target': 'Senior', 'value': 610},
                    {'source': 'Junior', 'target': 'Low GPA 3', 'value': 21},
                    {'source': 'Senior', 'target': 'Graduates', 'value': 608},
                    {'source': 'Senior', 'target': 'Fifth Year', 'value': 2},
                    {'source': 'Fifth Year', 'target': 'Late Graduates', 'value':0},
                    {'source': 'Fifth Year', 'target': 'Sixth Year', 'value': 0},
                ],
                settings: {
                    width: 1500,
                    height: 400,
                    padding: 16,
                    nodeWidth: 36,
                    n: 1000,
                    scale: 0,
                    marginTop: 20
                }
            }
        },
        mounted() {
            d3.csv('./student-data.csv', (error, data) => {
                this.init(data);
            });
        },
        watch: {
            filter: {
                handler: function() {
                    this.update();
                },
                deep: true
            }
        },
        methods: {
            init(data) {
                // clean data
                for (let student of data) {
                    this.students.push(new Student(student));
                }
                this.measure();
                this.update();

            },
            update() {
                if (this.students.length) {
                    this.countAll();
                    this.create();
                }

            },
            measure() {
                this.settings.height = this.$refs.container.clientHeight - 40;
                this.settings.width = this.$refs.container.clientWidth - 40;
                this.scale = (this.settings.height - this.settings.padding - 2 - this.settings.marginTop) / this.settings.n;
            },
            count(type){
                let n = 0;
                let totalStudents = 0;
                for (let student of this.students) {
                    if (this.passesFilter(student)) {
                        switch (type) {
                            case 'Sophomore':
                                if (student.passesYear1()) {
                                    n++;
                                }
                                break;
                            case 'Low GPA 1':
                                if (!student.passesYear1()) {
                                    n++;
                                }
                                break;
                            case 'Junior':
                                if (student.passesYear2()) {
                                    n++;
                                }
                                break;
                            case 'Low GPA 2':
                                if (student.passesYear1() && !student.passesYear2()) {
                                    n++;
                                }
                                break;
                            case 'Senior':
                                if (student.passesYear3()) {
                                    n++;
                                }
                                break;
                            case 'Low GPA 3':
                                if (student.passesYear2() && !student.passesYear3()) {
                                    n++;
                                }
                                break;
                            case 'Graduates':
                                if (student.passesYear4()) {
                                    n++;
                                }
                                break;
                            case 'Fifth Year':
                                if (student.passesYear3() && !student.passesYear4()) {
                                    n++;
                                }
                                break;
                            case 'Late Graduates':
                                if (student.passesYear5()) {

                                    n++;
                                }
                                break;
                            case 'Sixth Year':
                                if (student.didYear5() && !student.passesYear5()) {
                                    n++;
                                }
                                break;
                        }
                    }
                }
                return n;
            },
            passesFilter(student) {
                let avg = student.averageGPA();
                return (this.filter.gender === 'All' || student.gender === this.filter.gender) &&
                    (this.filter.ethnicity === 'All' || student.ethnicity === this.filter.ethnicity) &&
                    (this.filter.jobSecuring === 'All' || student.matchesJobSecuring(this.filter.jobSecuring)) &&
                    (avg >= this.filter.gpaRange[0] && avg <= this.filter.gpaRange[1]);
            },
            countAll(){
                this.links = [];

                for (let sourceLink of this.linksSource) {
                    this.links.push({...sourceLink});
                }

                for (let link of this.links) {
                    link.value = this.count(link.target);
                }
            },
            create() {
                let svg, sankey, path, graph, formatNumber, format, color, node, link;

                formatNumber = d3.format(",.0f");
                format = function(d) { return formatNumber(d); };
                color = d3.scale.category20();



                const createSvg = () => {
                    d3.select(".container").selectAll('*').remove();
                    svg = d3.select(".container").append("svg")
                        .attr("width", this.settings.width)
                        .attr("height", this.settings.height)
                        .append("g")
                        .attr('transform', 'translate(0, ' + this.settings.marginTop + ')');
                };

                const createSankey = () => {
                    sankey = d3.sankey()
                        .nodeWidth(this.settings.nodeWidth)
                        .nodePadding(this.settings.padding)
                        .size([this.settings.width, this.settings.height]);

                    path = sankey.link();
                };

                const addNodesAndLinks = () => {
                    graph = {nodes : this.nodes, links : this.links};

                    // return only the distinct / unique nodes
                    graph.nodes = d3.keys(d3.nest()
                        .key(function (d) { return d.name; })
                        .map(graph.nodes));

                    // loop through each link replacing the text with its index from node
                    graph.links.forEach(function (d, i) {
                        graph.links[i].source = graph.nodes.indexOf(graph.links[i].source);
                        graph.links[i].target = graph.nodes.indexOf(graph.links[i].target);
                    });

                    //now loop through each nodes to make nodes an array of objects
                    // rather than an array of strings
                    graph.nodes.forEach(function (d, i) {
                        graph.nodes[i] = { "name": d };
                    });


                    sankey
                        .nodes(graph.nodes)
                        .links(graph.links)
                        .layout(32);
                };

                function repairGraph() {
                    repairNodes(graph.nodes);
                    repairLinks(graph.links);
                }

                const repairNodes = (nodes) => {
                    let index, l, horizontalWidth, theNode;
                    index = 0;
                    l = nodes.length;


                    horizontalWidth = (this.settings.width - this.settings.nodeWidth) / ((l - 1) / 2);
                    for (let node of nodes) {
                        let step = Math.ceil(index / 2);
                        node.x = step * horizontalWidth + 1;
                        if (index % 2 === 1 || index === 0  ) {
                            node.y = 1;
                        } else {
                            node.y = graph.nodes[index - 1].value * this.scale + this.settings.padding + 1;
                        }

                        node.dy = node.value * this.scale;

                        // rewire data
                        theNode = this.nodes[nodes.indexOf(node)];
                        node.color = theNode.color;
                        node.color2 = theNode.color2;
                        node.tuition = theNode.tuition;
                        node.age = theNode.age;
                        index++;
                    }
                };

                const repairLinks = (links) => {
                    let index;
                    index = 0;
                    for (let link of links) {
                        let targetIndex, sy;
                        targetIndex = graph.nodes.indexOf(link.target);
                        if (targetIndex % 2 === 1 || targetIndex === 0  ) {
                            sy = link.target.y;
                        } else {
                            sy = link.target.y - this.settings.padding;
                        }
                        link.dy = link.target.value * this.scale;
                        link.sy = sy;
                        index++;
                    }
                };

                function addLinks() {
                    link = svg.append("g").selectAll(".link")
                        .data(graph.links)
                        .enter().append("path")
                        .attr("class", "link")
                        .attr("d", path)
                        .style("stroke", function(d) {
                            return d.target.color2;
                        })
                        .style("stroke-width", function(d) { return Math.max(1, d.dy); })
                        .sort(function(a, b) { return b.dy - a.dy; });

                    // add the link titles
                    link.append("title")
                        .text(function(d) {
                            return d.source.name + " → " +
                                d.target.name + "\n" + format(d.value); });
                }

                const addNodes = () => {
                    node = svg.append("g").selectAll(".node")
                        .data(graph.nodes)
                        .enter().append("g")
                        .attr("class", "node")
                        .attr("transform", function(d) {
                            return "translate(" + d.x + "," + d.y + ")"; })
                        .call(d3.behavior.drag()
                            .origin(function(d) { return d; })
                            .on("dragstart", function() {
                                this.parentNode.appendChild(this); })
                            .on("drag", dragmove));

                    // add the rectangles for the nodes
                    node.append("rect")
                        .attr("height", function(d) { return d.dy; })
                        .attr("width", sankey.nodeWidth())
                        .style('fill', function(d){
                            return d.color;
                        })
                        .style("stroke", function(d) {
                            return d3.rgb(d.color).darker(2); })
                        .append("title")
                        .text(function(d) {
                            return d.name + "\n" + format(d.value); });

                    // add in the title for the nodes
                    node.append("text")
                        .attr("x", -6)
                        .attr("y", function(d) { return d.dy / 2; })
                        .attr("dy", ".35em")
                        .attr("text-anchor", "end")
                        .attr("transform", null)
                        .text((d) => {
                            return d.name + ' (' + d.value + ')';

                        })
                        .filter((d) => {
                            return d.x < this.settings.width / 2;
                        })
                        .attr("x", 6 + sankey.nodeWidth())
                        .attr("text-anchor", "start");

                    let addedX = 0;

                    if (this.filter.pursueGradDegree) {
                        addedX += 16;
                        node.append("text")
                            .attr("x", -6)
                            .attr("y", function(d) { return d.dy / 2 + addedX; })
                            .attr("dy", ".35em")
                            .attr("text-anchor", "end")
                            .attr("transform", null)
                            .text((d) => {
                                return d.age
                            })
                            .filter((d) => {
                                return d.x < this.settings.width / 2;
                            })
                            .attr("x", 6 + sankey.nodeWidth())
                            .attr("text-anchor", "start");
                    }

                    if (this.filter.tuitionPaid) {
                        addedX += 16;
                        node.append("text")
                            .attr("x", -6)
                            .attr("y", function(d) { return d.dy / 2 + addedX; })
                            .attr("dy", ".35em")
                            .attr("text-anchor", "end")
                            .attr("transform", null)
                            .text((d) => {
                                return d.tuition
                            })
                            .filter((d) => {
                                return d.x < this.settings.width / 2;
                            })
                            .attr("x", 6 + sankey.nodeWidth())
                            .attr("text-anchor", "start");
                    }




                };

                function dragmove(d) {
                    // d3.select(this).attr("transform",
                    //     "translate(" + d.x + "," + (
                    //         d.y = Math.max(0, Math.min(settings.height - d.dy, window.event.offsetY))
                    //     ) + ")");
                    // sankey.relayout();
                    // link.attr("d", path);
                }

                function init() {
                    createSvg();
                    createSankey();
                    addNodesAndLinks();
                    repairGraph();
                    addLinks();
                    addNodes();
                }


                init();


            }
        }
    }
</script>


<template>
    <div class="graph" ref="graph">
        <div class="container" ref="container">

        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .graph {
        padding: 20px;


        .container {
            height: 100%;
            background: #fff;
            padding: 20px;

            svg {

                .node rect {
                    shape-rendering: crispEdges;
                }

                .node text {
                    pointer-events: none;
                    text-shadow: 0 1px 0 #fff;
                }

                .link {
                    fill: none;
                    stroke-opacity: 0.7;
                }

                .link:hover {
                    stroke-opacity: 0.9;
                }
            }
        }
    }
</style>