const proxies: string[] = [
  "https://cn.image01.workers.dev/",
  "https://cn.image02.workers.dev/",
  "https://cn.image03.workers.dev/",
  "https://cn.image04.workers.dev/",
  "https://cn.image05.workers.dev/",
  "https://cn.image06.workers.dev/",
  "https://cn.image07.workers.dev/",
  "https://cn.image08.workers.dev/",
  "https://cn.image09.workers.dev/",
  "https://cn.image10.workers.dev/",
  "https://cn.image11.workers.dev/",
  "https://cn.image12.workers.dev/",
  "https://cn.image13.workers.dev/",
];

const availableProxies = [] as string[];

class ProxyRouting {
  static getProxy() {
    let proxy = proxies.shift();
    if (proxy) {
      proxies.push(proxy);
      return proxy;
    } else {
      throw new Error("No proxy available");
    }
  }

  static getAvailableProxies() {
    return availableProxies;
  }

  static setAvailableProxies(proxy: string) {
    availableProxies.push(proxy);
  }

  static removeAvailableProxies(proxy: string) {
    availableProxies.splice(availableProxies.indexOf(proxy), 1);
  }
}
