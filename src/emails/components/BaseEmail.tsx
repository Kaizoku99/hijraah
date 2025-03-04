import React from 'react';

interface BaseEmailProps {
    title: string;
    previewText?: string;
    children: React.ReactNode;
    footerText?: string;
}

export const BaseEmail: React.FC<BaseEmailProps> = ({
    title,
    previewText,
    children,
    footerText = '© 2025 Hijraah. All rights reserved.',
}) => {
    return (
        <html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                <title>{title}</title>
                {previewText && <meta name="description" content={previewText} />}
                <style>{`
          @media only screen and (max-width: 620px) {
            table.body h1 {
              font-size: 28px !important;
              margin-bottom: 10px !important;
            }
            
            table.body p,
            table.body ul,
            table.body ol,
            table.body td,
            table.body span,
            table.body a {
              font-size: 16px !important;
            }
            
            table.body .wrapper,
            table.body .article {
              padding: 10px !important;
            }
            
            table.body .content {
              padding: 0 !important;
            }
            
            table.body .container {
              padding: 0 !important;
              width: 100% !important;
            }
            
            table.body .main {
              border-left-width: 0 !important;
              border-radius: 0 !important;
              border-right-width: 0 !important;
            }
            
            table.body .btn table {
              width: 100% !important;
            }
            
            table.body .btn a {
              width: 100% !important;
            }
            
            table.body .img-responsive {
              height: auto !important;
              max-width: 100% !important;
              width: auto !important;
            }
          }
          
          @media all {
            .ExternalClass {
              width: 100%;
            }
            
            .ExternalClass,
            .ExternalClass p,
            .ExternalClass span,
            .ExternalClass font,
            .ExternalClass td,
            .ExternalClass div {
              line-height: 100%;
            }
            
            .apple-link a {
              color: inherit !important;
              font-family: inherit !important;
              font-size: inherit !important;
              font-weight: inherit !important;
              line-height: inherit !important;
              text-decoration: none !important;
            }
            
            #MessageViewBody a {
              color: inherit;
              text-decoration: none;
              font-size: inherit;
              font-family: inherit;
              font-weight: inherit;
              line-height: inherit;
            }
            
            .btn-primary table td:hover {
              background-color: #3498db !important;
            }
            
            .btn-primary a:hover {
              background-color: #3498db !important;
              border-color: #3498db !important;
            }

            [data-ogsb] .es-button {
              border-width: 0 !important;
              padding: 10px 20px 10px 20px !important;
            }
            
            [data-ogab] .es-button {
              border-width: 0 !important;
              padding: 10px 20px 10px 20px !important;
            }
          }
        `}</style>
            </head>
            <body
                style={{
                    backgroundColor: '#f6f6f6',
                    fontFamily: 'sans-serif',
                    fontSize: '14px',
                    lineHeight: '1.4',
                    margin: 0,
                    padding: 0,
                    WebkitFontSmoothing: 'antialiased',
                    msTextSizeAdjust: '100%',
                    WebkitTextSizeAdjust: '100%',
                }}
            >
                <span
                    style={{
                        color: 'transparent',
                        display: 'none',
                        height: 0,
                        maxHeight: 0,
                        maxWidth: 0,
                        opacity: 0,
                        overflow: 'hidden',
                        msoHide: 'all',
                        visibility: 'hidden',
                        width: 0,
                    }}
                >
                    {previewText}
                </span>
                <table
                    role="presentation"
                    border={0}
                    cellPadding="0"
                    cellSpacing="0"
                    className="body"
                    style={{
                        backgroundColor: '#f6f6f6',
                        width: '100%',
                    }}
                >
                    <tr>
                        <td style={{ fontSize: '14px', verticalAlign: 'top' }}>&nbsp;</td>
                        <td
                            className="container"
                            style={{
                                display: 'block',
                                margin: '0 auto',
                                maxWidth: '580px',
                                padding: '10px',
                                width: '580px',
                                fontSize: '14px',
                                verticalAlign: 'top',
                            }}
                        >
                            <div
                                className="content"
                                style={{
                                    boxSizing: 'border-box',
                                    display: 'block',
                                    margin: '0 auto',
                                    maxWidth: '580px',
                                    padding: '10px',
                                }}
                            >
                                <table
                                    role="presentation"
                                    className="main"
                                    style={{
                                        backgroundColor: '#ffffff',
                                        borderRadius: '3px',
                                        width: '100%',
                                        boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.05)',
                                    }}
                                >
                                    <tr>
                                        <td
                                            className="header"
                                            style={{
                                                padding: '20px 0',
                                                textAlign: 'center',
                                                backgroundColor: '#134e4a',
                                                borderTopLeftRadius: '3px',
                                                borderTopRightRadius: '3px',
                                            }}
                                        >
                                            <img
                                                src="https://placehold.co/400x100/134e4a/ffffff.png?text=Hijraah"
                                                alt="Hijraah"
                                                height="40"
                                                style={{ height: '40px', maxHeight: '40px' }}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            className="wrapper"
                                            style={{
                                                boxSizing: 'border-box',
                                                padding: '20px',
                                                fontSize: '14px',
                                                verticalAlign: 'top',
                                            }}
                                        >
                                            <table
                                                role="presentation"
                                                border={0}
                                                cellPadding="0"
                                                cellSpacing="0"
                                                width="100%"
                                                style={{
                                                    borderCollapse: 'separate',
                                                    msoTableLspace: '0pt',
                                                    msoTableRspace: '0pt',
                                                    width: '100%',
                                                }}
                                            >
                                                <tr>
                                                    <td
                                                        style={{
                                                            fontSize: '14px',
                                                            verticalAlign: 'top',
                                                        }}
                                                    >
                                                        {children}
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>

                                <div
                                    className="footer"
                                    style={{
                                        clear: 'both',
                                        marginTop: '10px',
                                        textAlign: 'center',
                                        width: '100%',
                                        color: '#999999',
                                        fontSize: '12px',
                                    }}
                                >
                                    <table
                                        role="presentation"
                                        border={0}
                                        cellPadding="0"
                                        cellSpacing="0"
                                        style={{
                                            borderCollapse: 'separate',
                                            msoTableLspace: '0pt',
                                            msoTableRspace: '0pt',
                                            width: '100%',
                                        }}
                                    >
                                        <tr>
                                            <td
                                                className="content-block"
                                                style={{
                                                    fontSize: '12px',
                                                    verticalAlign: 'top',
                                                    paddingBottom: '10px',
                                                    paddingTop: '10px',
                                                    color: '#999999',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                <span
                                                    className="apple-link"
                                                    style={{
                                                        color: '#999999',
                                                        fontSize: '12px',
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    {footerText}
                                                </span>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </td>
                        <td style={{ fontSize: '14px', verticalAlign: 'top' }}>&nbsp;</td>
                    </tr>
                </table>
            </body>
        </html>
    );
};

export const Button: React.FC<{
    text: string;
    url: string;
    fullWidth?: boolean;
}> = ({ text, url, fullWidth = false }) => {
    return (
        <table
            role="presentation"
            border={0}
            cellPadding="0"
            cellSpacing="0"
            className="btn btn-primary"
            style={{
                borderCollapse: 'separate',
                msoTableLspace: '0pt',
                msoTableRspace: '0pt',
                boxSizing: 'border-box',
                width: fullWidth ? '100%' : 'auto',
                minWidth: fullWidth ? '100%' : 'auto',
            }}
        >
            <tbody>
                <tr>
                    <td
                        align="left"
                        style={{
                            fontFamily: 'sans-serif',
                            fontSize: '14px',
                            verticalAlign: 'top',
                            paddingBottom: '15px',
                        }}
                    >
                        <table
                            role="presentation"
                            border={0}
                            cellPadding="0"
                            cellSpacing="0"
                            style={{
                                borderCollapse: 'separate',
                                msoTableLspace: '0pt',
                                msoTableRspace: '0pt',
                                width: fullWidth ? '100%' : 'auto',
                            }}
                        >
                            <tbody>
                                <tr>
                                    <td
                                        style={{
                                            fontFamily: 'sans-serif',
                                            fontSize: '14px',
                                            verticalAlign: 'top',
                                            backgroundColor: '#134e4a',
                                            borderRadius: '5px',
                                            textAlign: 'center',
                                        }}
                                    >
                                        <a
                                            href={url}
                                            target="_blank"
                                            style={{
                                                display: 'inline-block',
                                                color: '#ffffff',
                                                backgroundColor: '#134e4a',
                                                border: 'solid 1px #134e4a',
                                                borderRadius: '5px',
                                                boxSizing: 'border-box',
                                                cursor: 'pointer',
                                                textDecoration: 'none',
                                                fontSize: '14px',
                                                fontWeight: 'bold',
                                                margin: 0,
                                                padding: '12px 25px',
                                                textTransform: 'capitalize',
                                                borderColor: '#134e4a',
                                                width: fullWidth ? '100%' : 'auto',
                                            }}
                                        >
                                            {text}
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}; 