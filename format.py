import re

input_file = "gympages_sql.txt"
output_file = "gympages_schema.html"

# Define SQL keywords you want to highlight
sql_keywords = [
    "CREATE TABLE", "PRIMARY KEY", "FOREIGN KEY", "NOT NULL", "NULL",
    "DEFAULT", "AUTO_INCREMENT", "REFERENCES", "ON DELETE", "CHECK"
]

# Define SQL data types with a single color
data_types = [
    "INT", "VARCHAR", "TEXT", "TIMESTAMP", "ENUM", "POINT"
]

# Function to wrap keywords
def highlight_keywords(line):
    for kw in sorted(sql_keywords, key=lambda x: -len(x)):  # longer keywords first
        pattern = re.escape(kw)
        line = re.sub(f"\\b{pattern}\\b", f"<span class='keyword'>{kw}</span>", line, flags=re.IGNORECASE)
    return line

# Function to highlight data types with the same color
def highlight_data_types(line):
    for data_type in data_types:
        pattern = re.escape(data_type)
        line = re.sub(f"\\b{pattern}\\b", f"<span class='data-type'>{data_type}</span>", line, flags=re.IGNORECASE)
    return line

# HTML output header
html_output = [
    "<html>",
    "<head>",
    "<style>",
    "ul { list-style-type: none; padding-left: 2em; margin: 0; }",
    "body { background-color: #1e1e1e; color: #e0e0e0; font-family: monospace; padding: 1em; }",
    ".table-name { color: #4fc3f7; font-weight: bold; display: block; margin-top: 1em; }",
    ".keyword { color: #f78c6c; font-weight: bold; }",
    ".data-type { color: #66ccff; font-weight: bold; }",  # Color for all data types
    "div.table { margin-bottom: 2em; }",
    "</style>",
    "</head>",
    "<body>"
]

# Read the SQL content from the input file
with open(input_file, "r") as f:
    content = f.read()

# Find all CREATE TABLE statements
tables = re.findall(r"CREATE TABLE (.+?) \((.+?)\);", content, re.DOTALL)

# Process each table and its body
for table_name, body in tables:
    html_output.append("<div class='table'>")
    table_header = f"<p><span class='table-name'>CREATE TABLE {table_name.strip()} <span style='color:#352a2a'>(</span></span></p>"
    table_header = highlight_keywords(table_header)
    html_output.append(table_header)
    html_output.append("<ul>")
    
    # Process each line of the table body
    lines = [line.strip() for line in body.strip().splitlines() if line.strip()]
    for i, line in enumerate(lines):
        line = line.rstrip(",")
        comma = "," if i < len(lines) - 1 else ""
        
        # Apply highlighting for both keywords and data types
        line = highlight_keywords(line)
        line = highlight_data_types(line)
        
        html_output.append(f"<li>{line}{comma}</li>")
    
    html_output.append("</ul>")
    html_output.append(f"<p>);</p>")
    html_output.append("</div>")

# Final HTML footer
html_output.append("</body></html>")

# Write the output to the file
with open(output_file, "w") as f:
    f.write("\n".join(html_output))

print(f"🎨 Pretty SQL-style HTML with colored keywords and data types written to {output_file}")