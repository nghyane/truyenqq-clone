let proxies: string[] = [
  "http://EAzGMRSu:ZiNQDnXh@195.96.144.90:63270",
  "http://EAzGMRSu:ZiNQDnXh@103.171.110.97:64094",
  "http://EAzGMRSu:ZiNQDnXh@103.217.81.128:63588",
];

const ProxyRouting = () => {
  let proxy: string | undefined = proxies.shift();
  if (proxy) {
    proxies.push(proxy);
  } else {
    throw new Error("No proxy available");
  }

  return proxy;
};

export default ProxyRouting;
