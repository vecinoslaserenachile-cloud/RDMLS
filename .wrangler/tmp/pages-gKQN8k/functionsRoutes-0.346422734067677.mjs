import { onRequestOptions as __api_vecinity_pay_create_order_js_onRequestOptions } from "C:\\Users\\estud\\APP_LS_SEGURA\\functions\\api\\vecinity-pay\\create-order.js"
import { onRequestPost as __api_vecinity_pay_create_order_js_onRequestPost } from "C:\\Users\\estud\\APP_LS_SEGURA\\functions\\api\\vecinity-pay\\create-order.js"
import { onRequestPost as __api_vecinity_pay_webhook_js_onRequestPost } from "C:\\Users\\estud\\APP_LS_SEGURA\\functions\\api\\vecinity-pay\\webhook.js"
import { onRequestPost as __api_chat_js_onRequestPost } from "C:\\Users\\estud\\APP_LS_SEGURA\\functions\\api\\chat.js"
import { onRequestPost as __api_moderate_js_onRequestPost } from "C:\\Users\\estud\\APP_LS_SEGURA\\functions\\api\\moderate.js"
import { onRequest as __api_airport_monitoring_js_onRequest } from "C:\\Users\\estud\\APP_LS_SEGURA\\functions\\api\\airport-monitoring.js"
import { onRequest as __api_cloudflare_stats_js_onRequest } from "C:\\Users\\estud\\APP_LS_SEGURA\\functions\\api\\cloudflare-stats.js"
import { onRequest as __api_port_monitoring_js_onRequest } from "C:\\Users\\estud\\APP_LS_SEGURA\\functions\\api\\port-monitoring.js"
import { onRequest as __api_sismologia_js_onRequest } from "C:\\Users\\estud\\APP_LS_SEGURA\\functions\\api\\sismologia.js"

export const routes = [
    {
      routePath: "/api/vecinity-pay/create-order",
      mountPath: "/api/vecinity-pay",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_vecinity_pay_create_order_js_onRequestOptions],
    },
  {
      routePath: "/api/vecinity-pay/create-order",
      mountPath: "/api/vecinity-pay",
      method: "POST",
      middlewares: [],
      modules: [__api_vecinity_pay_create_order_js_onRequestPost],
    },
  {
      routePath: "/api/vecinity-pay/webhook",
      mountPath: "/api/vecinity-pay",
      method: "POST",
      middlewares: [],
      modules: [__api_vecinity_pay_webhook_js_onRequestPost],
    },
  {
      routePath: "/api/chat",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_chat_js_onRequestPost],
    },
  {
      routePath: "/api/moderate",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_moderate_js_onRequestPost],
    },
  {
      routePath: "/api/airport-monitoring",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_airport_monitoring_js_onRequest],
    },
  {
      routePath: "/api/cloudflare-stats",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_cloudflare_stats_js_onRequest],
    },
  {
      routePath: "/api/port-monitoring",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_port_monitoring_js_onRequest],
    },
  {
      routePath: "/api/sismologia",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_sismologia_js_onRequest],
    },
  ]