<script>
    import vueSlider from 'vue-slider-component';


    export default {
        name: 'filters',
        components: {
            vueSlider
        },
        data() {
            return {
                options: this.$store.state.filter.options,
                filter: {
                    gpaRange: this.$store.state.filter.gpaRange,
                    gender: this.$store.state.filter.gender,
                    ethnicity: this.$store.state.filter.ethnicity,
                    jobSecuring: this.$store.state.filter.jobSecuring,
                    tuitionPaid: this.$store.state.filter.tuitionPaid,
                    pursueGradDegree: this.$store.state.filter.pursueGradDegree,
                },
                sliderOptions: {
                    min: 0,
                    max: 4,
                    interval: 0.1
                }
            }
        },
        watch: {
            filter: {
                handler: function() {
                    this.$store.commit('filter/update', this.filter);
                },
                deep: true
            }
        }
    }
</script>


<template>
    <div class="filters">
        <div class="filter__box">
            <div class="vue-slider__container">
                <div class="vue-slider__label">
                    GPA
                </div>
                <vue-slider
                    v-model="filter.gpaRange"
                    v-bind="sliderOptions"/>
            </div>
        </div>


        <div class="filter__box">
            <md-field>
                <label>Gender</label>
                <md-select
                        v-model="filter.gender"
                        placeholder="Gender">
                    <md-option
                            v-for="(gender, index) in options.gender"
                            :value="gender"
                            :key="index">{{gender}}</md-option>
                </md-select>
            </md-field>
        </div>

        <div class="filter__box">
            <md-field>
                <label>Ethnicity</label>
                <md-select
                        v-model="filter.ethnicity"
                        placeholder="Ethnicity">
                    <md-option
                            v-for="(ethnicity, index) in options.ethnicity"
                            :value="ethnicity"
                            :key="index">{{ethnicity}}</md-option>
                </md-select>
            </md-field>
        </div>

        <div class="filter__box">
            <md-field>
                <label>Securing a job</label>
                <md-select
                        v-model="filter.jobSecuring"
                        placeholder="Securing a job">
                    <md-option
                            v-for="(jobSecure, index) in options.jobSecuring"
                            :value="jobSecure"
                            :key="index">{{jobSecure}}</md-option>
                </md-select>
            </md-field>
        </div>

        <div class="filter__box">
            <md-switch v-model="filter.tuitionPaid">Tuition Paid</md-switch>
        </div>

        <div class="filter__box">
            <md-switch v-model="filter.pursueGradDegree">Pursue Grad Degree</md-switch>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .filters {
        display: flex;
        border-bottom: $border;
        padding: 20px 20px 0 20px;

        .filter__box {
            padding: 8px;
            border-right: $border;
            background: #fff;

            .vue-slider__container {
                width: 200px;


                .vue-slider__label {
                    height: 32px;
                    font-size: 12px;
                    color: rgba(0,0,0,0.54);
                    line-height: 20px;
                    letter-spacing: .01em;
                    -webkit-font-smoothing: antialiased;
                    padding-left: 8px;
                }
            }

            .md-field {
                margin-top: 0;
                margin-bottom: 4px;

                .md-select {
                    width: 100%;
                    max-width: 200px;
                    height: 24px;

                    input {
                        height: 24px;
                        font-size: 14px!important;
                    }
                }

                &.md-theme-default:after {
                    background-color: transparent;
                }
            }
        }
    }
</style>