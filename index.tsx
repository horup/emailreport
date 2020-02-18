import * as express from 'express';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import styled from 'styled-components';
import {renderToNodeStream} from 'react-dom/server';

import {ServerStyleSheet} from 'styled-components';

const app = express();
const port = 5000;

const Heading = styled.h1`
    color: red;
`

const Table = styled.table`
    width:100%;
    font-size: 1.5em;
`


const Report = ()=>
{
    return (
        <div>
            <Heading>Hi!</Heading>
            <Table>
                <thead>
                    <tr>
                        <th>Varmeforbrug</th>
                        <th>Delta</th>
                        <th>Grader</th>
                        <th>Delta</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            2,452mw
                        </td>
                        <td>
                            10% under budget
                        </td>
                        <td>
                            41
                        </td>
                        <td>
                            1.2 over minimum
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}





app.get("/", (req, res)=>
{
    res.write('<html><head><title>Report</title></head><body>');
    const sheet = new ServerStyleSheet();
    const jsx = sheet.collectStyles(<Report/>);
    const s = sheet.interleaveWithNodeStream(renderToNodeStream(jsx));
    s.pipe(res, {end:false});
   // res.send();
    s.on('end', ()=>res.end("</body></html>"));
});
app.listen(port, ()=>console.log("started listener"));