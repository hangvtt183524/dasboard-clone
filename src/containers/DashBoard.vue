<template>
  <div>
    <Header></Header>
    <BreadCrumb></BreadCrumb>
    <div class="main-container" id="container">
      <div class="overlay"></div>
      <div class="search-overlay"></div>
      <SideBar></SideBar>
      >
      <div id="content" class="main-content">
        <div class="layout-px-spacing">
          <div class="row">
            <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 layout-spacing">
              <div class="widget widget-account-invoice-three">
                <div class="widget-heading widget-padding homepage-flag">
                  <div class="content-card" style="align-items: center;">
                    <div class="title-card row" style="align-items: center; margin-bottom: 30px;">
                      <div class="col-xl-3 col-lg-2 col-2 pr-0 pl-0">
                        <div class="logo">
                          <img src="../assets/svg/logo-roboinu-card.svg" alt="">
                        </div>
                      </div>
                      <div class="col-xl-6 col-lg-8 col-8 pr-0 pl-0">
                        <div class="title-text">
                          <h4 style="margin-bottom: 0;">Robo Inu</h4>
                          <small>$RBIF</small>
                        </div>
                      </div>
                      <div class="col-xl-3 col-lg-2 col-2 pr-0 pl-0"
                           style="text-align: -webkit-right;">
                        <div class="tag">
                          <p>24h</p>
                        </div>
                      </div>
                    </div>
                    <div class="value-wrapper">
                      <p class="token-price" v-html="formattedValue + ' USD'"></p>
                      <p style="color: rgba(254, 38, 38, 0.44); font-size: 12px"
                         v-if="percent < 0"><img
                          src="../assets/svg/arrow-value-dec.svg" alt=""> {{ 0 - percent }}%
                      </p>
                      <p style="color: rgba(26, 188, 156, 0.44); font-size: 12px;" v-else><img
                          src="../assets/svg/arrow-value-inc.svg" alt=""
                          style="transform: rotateX(180deg)">
                        {{ percent }}%</p>
                    </div>
                    <div class="chart">
                      <Chart :ChartData="lineChart"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12 layout-spacing">
              <div class="widget widget-account-invoice-three">
                <div class="widget-heading widget-padding homepage-flag">
                  <div class="content-card">
                    <div class="title-card">
                      <h4 class="">$RBIF Metrics</h4>
                    </div>
                    <div class="table-content">
                      <table class="flag">
                        <colgroup>
                          <col span="1" style="width: 50%"/>
                          <col span="1" style="width: 50%"/>
                        </colgroup>
                        <thead>
                        <tr class="flag">
                          <th class="flag">METRIC</th>
                          <th class="flag">VALUE</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr
                            class="border-table flag"
                        >
                          <td class="flag">Daily Volume ETH</td>
                          <td class="flag">{{ detailsMetricsCard.dailyVolumeETH }}</td>
                        </tr>
                        <tr
                            class="border-table flag"
                        >
                          <td class="flag">Daily Volume Token</td>
                          <td class="flag">{{ detailsMetricsCard.dailyVolumeToken }}</td>
                        </tr>
                        <tr
                            class="border-table flag"
                        >
                          <td class="flag">Daily Volume USD</td>
                          <td class="flag">{{ detailsMetricsCard.dailyVolumeUSD }}</td>
                        </tr>
                        <tr
                            class="border-table flag"
                        >
                          <td class="flag">Price USD</td>
                          <td class="flag">{{ detailsMetricsCard.priceUSD }}</td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="small-text">
                      <small>Metrics will auto refresh at 00:00 UTC</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 layout-spacing">
              <div class="widget widget-account-invoice-three">
                <div class="widget-heading widget-padding homepage-flag">
                  <div class="content-card">
                    <div class="title-card">
                      <h4 class="">Supply Mechanics</h4>
                    </div>
                    <div class="card-content flag2">
                      <div class="data-container" style="gap: 0.5rem 0;">
                        <div class="data-item">
                          <div class="data-item-heading">
                            <div class="data-heading-title">Circulating&nbsp;</div>
                            <svg
                                width="1.2em"
                                height="1.2em"
                                preserveAspectRatio="xMidYMid meet"
                                viewBox="0 0 24 24"
                            >
                              <path
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-width="2"
                                  d="M13 20c6-1 8-6 8-10m-7 6l-2 4l4 3M0 9l4-3l3 4m2 10c-6-3-7-8-5-14m16 1C16 1 10 1 6 4.006M20 2v5h-5"
                              ></path>
                            </svg>
                          </div>
                          <div class="data-table-container">
                            <table class="data-table">
                              <tr class="data-table-row">
                                <td class="data-table-cell">Supply</td>
                                <td class="data-table-cell">
                                  {{ this.detailsMechanicsCard.circulating }}
                                  Trillion
                                </td>
                              </tr>
                            </table>
                          </div>
                          <div class="bar">
                            <div
                                class="bar-fill"
                                :style="{
                                      width: detailsMechanicsCard.circulatingPercent + '%',
                                    }"
                            >
                              {{ detailsMechanicsCard.circulatingPercent }}%
                            </div>
                          </div>
                        </div>
                        <div class="data-item">
                          <div class="data-item-heading">
                            <div class="data-heading-title">burned&nbsp;</div>
                            <svg
                                width="1.2em"
                                height="1.2em"
                                preserveAspectRatio="xMidYMid meet"
                                viewBox="0 0 16 16"
                            >
                              <path
                                  d="M5.016 16c-1.066-2.219-.498-3.49.321-4.688c.897-1.312 1.129-2.61 1.129-2.61s.706.917.423 2.352c1.246-1.387 1.482-3.598 1.293-4.445c2.817 1.969 4.021 6.232 2.399 9.392c8.631-4.883 2.147-12.19 1.018-13.013c.376.823.448 2.216-.313 2.893C9.999 1.002 6.818.002 6.818.002c.376 2.516-1.364 5.268-3.042 7.324c-.059-1.003-.122-1.696-.649-2.656c-.118 1.823-1.511 3.309-1.889 5.135c-.511 2.473.383 4.284 3.777 6.197z"
                                  fill="currentColor"
                              ></path>
                            </svg>
                          </div>
                          <div class="data-table-container">
                            <table class="data-table">
                              <tr class="data-table-row">
                                <td class="data-table-cell">Total</td>
                                <td class="data-table-cell">
                                  {{ this.detailsMechanicsCard.burn }} Trillion
                                </td>
                              </tr>
                            </table>
                          </div>
                          <div class="bar">
                            <div
                                class="bar-fill"
                                :style="{
                                      width: detailsMechanicsCard.burnPercent + '%',
                                     }"
                            >
                              {{ detailsMechanicsCard.burnPercent }}%
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <CardListEvent/>
        </div>
        <Footer></Footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Chart from "../components/Chart.vue";
import {CardMetricsUseCase} from "@/usecases/CardMetricsUseCase";
import {CardMechanicsUseCase} from "@/usecases/CardMechanicsUseCase";

import Vue from "vue";
import {PriceTokenUseCase} from "@/usecases/GetPriceTokenUsecase";
import BreadCrumb from "@/components/BreadCrumb.vue";
import SideBar from "@/components/SideBar.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import CardListEvent from "@/components/CardListEvent.vue";
import {lineChart} from "@/chart-data/chart-data";
import {ICardMechanics} from "@/entities/CardMechanics";
import {ICardMetrics} from "@/entities/CardMetrics";

export default Vue.extend({
  components: {
    Header,
    Footer,
    SideBar,
    BreadCrumb,
    CardListEvent,
    Chart,
  },
  data() {
    return {
      lineChart: lineChart,
      value: "-",
      percent: "-",
      detailsMetricsCard: Object as ICardMetrics,
      detailsMechanicsCard: Object as ICardMechanics,
      detailPriceCard: {},
      cardInfo: new CardMetricsUseCase(),
      cardMechanics: new CardMechanicsUseCase(),
      price_info: new PriceTokenUseCase(),
    };
  },
  computed: {
    formattedValue() {
        if (isNaN(this.value)) {
            return this.value;
        }
        let valueStr = String(this.value);
        let separatorSymbol = '.';
        if (valueStr.indexOf(separatorSymbol) < 0) {
            separatorSymbol = ',';
        }
        const numberParts = valueStr.split(separatorSymbol);
        let decimalPart = numberParts[1];
        if (numberParts.length === 0 || !decimalPart) {
            return valueStr;
        }
        let shortenZeros = '';
        let i;
        for (i = 0; i < decimalPart.length; i++) {
            if (decimalPart[i] !== '0') {
                shortenZeros = i < 3 ? Array(i).fill('0').join('') : `0<sub>${i}</sub>`;
                break;
            }
        }
        return numberParts[0] + separatorSymbol + shortenZeros + decimalPart.slice(i, i + 4);
    }
  },
  methods: {
    async getDataMetrics() {
      await this.cardInfo.getData().then(() => {
        this.detailsMetricsCard = this.cardInfo.getDataFromAPI();
      });

    },
    async getDataMechanics() {
      await this.cardMechanics.getData().then(() => {
        this.detailsMechanicsCard = this.cardMechanics.getDataFromAPI();
      });
    },
    async getPriceInfo() {
      await this.price_info.getData();
      this.detailPriceCard = this.price_info.getDataFromAPI();
      this.value = this.detailPriceCard.price
    },
  },
  watch: {},
  created() {
    this.getPriceInfo()
    this.getDataMetrics()
    this.getDataMechanics()
  },
});
</script>

<style scoped>
@import "../assets/css/plugins.css";
@import "../assets/css/dashboard/carddashboard.css";

.small-text {
  display: flex;
  width: 100%;
  justify-content: flex-end;
}

.small-text small {
  font-size: 70%;
}

.chart {
  width: 200px;
  height: 75px;
}

.token-price >>> sub {
    font-weight: bold;
}
</style>
