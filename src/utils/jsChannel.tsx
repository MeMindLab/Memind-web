import { useEffect } from "react";

declare global {
  interface Window {
    flutter_inappwebview: any;
  }
}

const FlutterJsChannel = () => {
  const handlePlatformReady = () => {
    localStorage.setItem("emotion", "button");
    localStorage.setItem("trash", "webview");
  };

  useEffect(() => {
    if (window.flutter_inappwebview?.isPlatformReady) {
      handlePlatformReady();
    } else {
      const eventListener = () => {
        handlePlatformReady();

        window.removeEventListener(
          "flutterInAppWebViewPlatformReady",
          eventListener
        );
      };

      window.addEventListener(
        "flutterInAppWebViewPlatformReady",
        eventListener
      );

      return () => {
        window.removeEventListener(
          "flutterInAppWebViewPlatformReady",
          eventListener
        );
      };
    }
  }, []);

  return null;
};

export default FlutterJsChannel;
