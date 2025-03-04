import React from 'react';

export interface BaseEmailProps {
    previewText?: string;
    children: React.ReactNode;
    title?: string;
}

export const BaseEmail: React.FC<BaseEmailProps> = ({
    previewText = "Hijraah - Immigration Simplified",
    children,
    title = "Hijraah"
}) => {
    return (
        <html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
                <title>{title}</title>
                {previewText && (
                    <meta
                        name="description"
                        content={previewText}
                    />
                )}
                <style dangerouslySetInnerHTML={{
                    __html: `
          /* Base styles */
          body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            background-color: #f6f6f6;
            color: #333;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background-color: #134e4a;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 5px 5px 0 0;
          }
          .content {
            background-color: white;
            padding: 20px;
            border-radius: 0 0 5px 5px;
            box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16);
          }
          .button {
            display: inline-block;
            background-color: #134e4a;
            color: white !important;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
            margin: 20px 0;
            font-weight: bold;
          }
          .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 12px;
            color: #999;
          }
          h1, h2, h3 {
            color: #134e4a;
          }
          a {
            color: #134e4a;
          }
          .text-center {
            text-align: center;
          }
          .text-secondary {
            color: #666;
          }
          .mb-4 {
            margin-bottom: 16px;
          }
          .mb-2 {
            margin-bottom: 8px;
          }
        `}} />
            </head>
            <body>
                <div className="container">
                    <div className="header">
                        <h1>Hijraah</h1>
                    </div>
                    <div className="content">
                        {children}
                    </div>
                    <div className="footer">
                        <p>&copy; {new Date().getFullYear()} Hijraah. All rights reserved.</p>
                        <p>This is an automated message, please do not reply.</p>
                    </div>
                </div>
            </body>
        </html>
    );
};

export default BaseEmail; 