import { useEffect } from "react";

declare global {
  interface Window {
    flutter_inappwebview: any;
  }
}

const FlutterJsChannel = () => {
  useEffect(() => {
    const handlePlatformReady = () => {
      localStorage.setItem("emotion", "webview");
      localStorage.setItem("trash", "webview");
    };

    window.addEventListener(
      "flutterInAppWebViewPlatformReady",
      handlePlatformReady
    );

    return () => {
      window.removeEventListener(
        "flutterInAppWebViewPlatformReady",
        handlePlatformReady
      );
    };
  }, []);

  return null;
};

export default FlutterJsChannel;
