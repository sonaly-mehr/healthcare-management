export const SettingsIcon: React.FC<React.SVGAttributes<{}>> = (props) => {
    return (
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M16.1477 27.1092H11.6597C10.8687 27.1092 10.1099 26.7949 9.55056 26.2356C8.99121 25.6763 8.67695 24.9175 8.67695 24.1265C8.67975 23.9683 8.63985 23.8122 8.56145 23.6748C8.48282 23.5376 8.36871 23.4239 8.23105 23.346C7.95758 23.1775 7.6125 23.1775 7.33898 23.346C6.65365 23.7497 5.83464 23.8603 5.067 23.6526C4.30467 23.4417 3.65458 22.9416 3.25514 22.2589L1.01117 18.3701C0.6166 17.6859 0.509502 16.8734 0.713434 16.1105C0.917139 15.3475 1.41531 14.6964 2.09831 14.3002C2.23855 14.2242 2.35568 14.1114 2.43665 13.9738C2.51762 13.8363 2.55985 13.6793 2.55822 13.5197C2.56009 13.3636 2.51972 13.2098 2.44109 13.0747C2.36245 12.9399 2.24882 12.8286 2.11232 12.7532C1.42585 12.3565 0.924624 11.7042 0.718124 10.9385C0.511856 10.1732 0.617089 9.35721 1.01119 8.66937L3.25516 4.78057C3.65463 4.09781 4.30469 3.59778 5.06701 3.38686C5.83962 3.1988 6.6551 3.33483 7.32502 3.76323C7.50866 3.8806 7.72869 3.92773 7.94429 3.896C8.16012 3.8645 8.35706 3.756 8.49939 3.5908C8.64173 3.4256 8.71943 3.21466 8.71873 2.99649C8.715 2.20317 9.02767 1.44084 9.58744 0.878507C10.1472 0.316166 10.9081 0 11.7015 0H16.1895C16.9807 0 17.7393 0.314069 18.2986 0.873609C18.858 1.43292 19.1723 2.19146 19.1723 2.98276C19.1695 3.14095 19.2094 3.29682 19.2878 3.43426C19.3664 3.5717 19.4805 3.68533 19.6184 3.76326C19.8919 3.93173 20.2369 3.93173 20.5105 3.76326C21.1956 3.35936 22.0146 3.24876 22.7822 3.45666C23.5445 3.66759 24.1946 4.16761 24.5941 4.85037L26.838 8.73917L26.8383 8.73894C27.2326 9.42307 27.3397 10.2358 27.136 10.9988C26.9321 11.7616 26.4341 12.4126 25.7509 12.809C25.6107 12.8849 25.4935 12.9978 25.4126 13.1352C25.3316 13.2729 25.2896 13.4299 25.291 13.5895C25.2891 13.7456 25.3297 13.8994 25.4081 14.0343C25.4867 14.1694 25.6004 14.2804 25.7371 14.356C26.4233 14.7527 26.9246 15.4051 27.1311 16.1705C27.3373 16.936 27.2321 17.752 26.8382 18.4399L24.5943 22.3287L24.594 22.3284C24.1946 23.0112 23.5445 23.5112 22.7822 23.7224C22.0192 23.931 21.2041 23.8202 20.5242 23.4158C20.3405 23.2984 20.1207 23.2511 19.9049 23.2828C19.6891 23.3145 19.4921 23.4228 19.3498 23.588C19.2077 23.7532 19.1298 23.9644 19.1305 24.1823C19.1158 24.9637 18.7952 25.7081 18.2375 26.2555C17.6796 26.8029 16.9292 27.1095 16.1478 27.1093L16.1477 27.1092ZM7.78495 21.1299C8.30878 21.132 8.82306 21.2713 9.27644 21.5342C9.73099 21.7935 10.1088 22.1687 10.3708 22.6218C10.6328 23.0747 10.7698 23.5892 10.7677 24.1126C10.7677 24.3506 10.8612 24.5788 11.0281 24.7485C11.1949 24.9179 11.422 25.0149 11.6597 25.0187H16.1477C16.3843 25.0187 16.6111 24.9246 16.7784 24.7573C16.9458 24.59 17.0398 24.3632 17.0398 24.1266C17.0367 23.6011 17.1732 23.0843 17.435 22.6288C17.6971 22.1734 18.0753 21.7956 18.531 21.5343C18.9828 21.2669 19.4978 21.1257 20.0226 21.1257C20.5473 21.1257 21.0623 21.2669 21.5138 21.5343C21.7187 21.6556 21.9637 21.6899 22.194 21.6297C22.4243 21.5695 22.6212 21.4197 22.7405 21.2137L25.0542 17.3249C25.1748 17.1221 25.2089 16.8794 25.1485 16.6513C25.0883 16.4233 24.9387 16.2289 24.7336 16.1122C24.1249 15.7622 23.6591 15.2083 23.4185 14.5484C23.1779 13.8885 23.1779 13.165 23.4185 12.5051C23.6591 11.8455 24.1248 11.2915 24.7336 10.9413C24.9396 10.822 25.0894 10.6253 25.1496 10.395C25.2098 10.1645 25.1755 9.91972 25.0542 9.71483L22.7405 5.82603C22.621 5.62093 22.4259 5.47066 22.1968 5.40789C21.9698 5.34816 21.7283 5.38339 21.5278 5.50543C20.6036 6.0358 19.4675 6.03557 18.5437 5.50473C17.6197 4.97389 17.0471 3.9925 17.0398 2.92709C17.0398 2.68908 16.9463 2.46088 16.7794 2.29122C16.6126 2.12182 16.3856 2.02475 16.1478 2.02102H11.6598C11.4232 2.02102 11.1964 2.11505 11.0291 2.28236C10.8617 2.44966 10.7677 2.67646 10.7677 2.91309C10.7708 3.43856 10.6343 3.95538 10.3725 4.41086C10.1104 4.86633 9.73217 5.24408 9.27646 5.50542C8.82472 5.77283 8.30972 5.91399 7.78496 5.91399C7.26019 5.91399 6.74523 5.77282 6.2937 5.50542C6.08883 5.38409 5.84383 5.34978 5.6135 5.40998C5.3832 5.47018 5.18627 5.61998 5.06703 5.82602L2.82306 9.71482C2.70243 9.91759 2.66836 10.1603 2.72856 10.3884C2.789 10.6164 2.93856 10.8108 3.14367 10.9274C3.75242 11.2774 4.21816 11.8314 4.45877 12.4913C4.69934 13.1512 4.69934 13.8747 4.45877 14.5346C4.21821 15.1942 3.75248 15.7482 3.14367 16.0984C2.9353 16.2153 2.78246 16.4111 2.71946 16.6416C2.65669 16.8722 2.68889 17.1183 2.80906 17.3249L5.05303 21.2137C5.1725 21.4188 5.3678 21.569 5.59671 21.6318C5.82374 21.6915 6.06525 21.6563 6.26567 21.5343C6.72861 21.2704 7.252 21.1311 7.78495 21.1299V21.1299Z"
          fill="#737780"
        />
        <path
          d="M13.9035 18.7469C12.5172 18.7469 11.1879 18.1962 10.2077 17.216C9.22745 16.2357 8.67676 14.9064 8.67676 13.5202C8.67676 12.1339 9.22743 10.8046 10.2077 9.82438C11.1879 8.84415 12.5172 8.29346 13.9035 8.29346C15.2897 8.29346 16.6191 8.84413 17.5993 9.82438C18.5795 10.8046 19.1302 12.1339 19.1302 13.5202C19.1302 14.9064 18.5795 16.2358 17.5993 17.216C16.619 18.1962 15.2897 18.7469 13.9035 18.7469ZM13.9035 10.3841C13.0716 10.3841 12.2741 10.7146 11.6859 11.3026C11.0979 11.8908 10.7674 12.6883 10.7674 13.5202C10.7674 14.352 11.0979 15.1496 11.6859 15.7378C12.2741 16.3258 13.0716 16.6562 13.9035 16.6562C14.7353 16.6562 15.5329 16.3258 16.1211 15.7378C16.7091 15.1496 17.0395 14.352 17.0395 13.5202C17.0395 12.6883 16.7091 11.8908 16.1211 11.3026C15.5329 10.7146 14.7353 10.3841 13.9035 10.3841Z"
         fill="#737780"
        />
      </svg>
    );
  };
  